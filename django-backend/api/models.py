from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db import transaction
from django.db.models import F
from django.utils import timezone

# Create your models here.
class User(AbstractUser):
    ROLE_PLANNER = 'planner'
    ROLE_SUPERVISOR = 'supervisor'
    ROLE_TECH = 'technician'
    ROLE_CHOICES = [
        (ROLE_PLANNER, 'Planner'),
        (ROLE_SUPERVISOR, 'Supervisor'),
        (ROLE_TECH, 'Technician'),
    ]

    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def clean(self):
        #Ensure superusers have a role or default to planner
        if self.is_superuser and not self.role:
            self.role = self.ROLE_PLANNER

    def __str__(self):
        return f"{self.username} ({self.role})"
    

class Task(models.Model):
    STATUS_PENDING = 'pending'
    STATUS_COMPLETED = 'completed' #same as accepted
    STATUS_REJECTED = 'rejected'
    STATUS_CHOICES = [
        (STATUS_PENDING, 'Pending'),
        (STATUS_COMPLETED, 'Completed'),
        (STATUS_REJECTED, 'Rejected'),
    ]
    ISSUE_ISSUE = 'issue'
    ISSUE_DELAY = 'delay'
    ISSUE_CHOICES = [
        (ISSUE_ISSUE, 'Issue'),
        (ISSUE_DELAY, 'Delay'),
    ]

    operation = models.ManyToManyField('Operation', related_name='tasks', blank=True)
    job_order = models.ForeignKey('JobOrder', on_delete=models.PROTECT, related_name='tasks')
    issue_option = models.CharField(max_length=10, choices=ISSUE_CHOICES)
    issue_description = models.TextField(blank=True, null=True)
    device_serial_number = models.CharField(max_length=100)
    actual_number = models.PositiveIntegerField()
    actual_time = models.PositiveIntegerField()
    device_instances = models.ManyToManyField('DeviceInstance', related_name='tasks', blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Task {self.id} for Job Order {self.job_order.id}"


class Operation(models.Model):
    name = models.CharField(max_length=100)
    minimum_output = models.PositiveIntegerField()
    standard_time = models.PositiveIntegerField(help_text="Time in minutes")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
class Device(models.Model):
    """
    Represents a device with a serial number (e.g "AA") which consists of an ordered set of operations.
    """
    name = models.CharField(max_length=150, unique=True)
    description = models.TextField(blank=True, null=True)
    operations = models.ManyToManyField(Operation, through='DeviceOperation', related_name='devices')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class DeviceOperation(models.Model):
    """
    Through model to connect a Device to an Operation with ordering and optional overrides.
    e.g. Device "AA" -> Operation "asm" (order=1, minimum_output_override=None, standard_time_override=32)
    """
    device = models.ForeignKey(Device, on_delete=models.CASCADE, related_name='device_operations')
    operation = models.ForeignKey(Operation, on_delete=models.CASCADE, related_name='device_operations')
    order = models.PositiveIntegerField(default=1, help_text="Lower numbers run earlier")
    minimum_output_override = models.PositiveIntegerField(blank=True, null=True, help_text="If set, use instead of operation.minimum_output")
    standard_time_override = models.PositiveIntegerField(blank=True, null=True, help_text="If set, use instead of operation.standard_time")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('device', 'operation')
        ordering = ['order']

    def __str__(self):
        return f"{self.device.name} - {self.operation.name} (Order: {self.order})"

class JobOrder(models.Model):
    order_number = models.CharField(max_length=100, unique=True)
    number_devices = models.PositiveIntegerField(default=1)
    number_of_finished_devices = models.PositiveIntegerField(default=0)
    due_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Job Order {self.order_number}"
    
    def is_completed(self):
        return self.number_of_finished_devices >= self.number_devices
    
    def _recount_devices(self):
        qs = self.device_instances.all()
        self.number_devices = qs.count()
        self.number_of_finished_devices = qs.filter(finished=True).count()

    def save(self, *args, **kwargs):
        try:
            self._recount_devices()
        except Exception:
            pass
        super().save(*args, **kwargs)

class DeviceInstance(models.Model):
    """
    A physical device (unique serial across all orders). Linked to a JobOrder and to a Device (type).
    Enforces global uniqueness of serial.
    """
    job_order = models.ForeignKey(JobOrder, on_delete=models.CASCADE, related_name='device_instances')
    device = models.ForeignKey('Device', on_delete=models.PROTECT, related_name='instances')
    serial = models.CharField(max_length=150, unique=True)
    finished = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    finished_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        # serial is globally unique (unique=True), but also keep an index and a uniqueness constraint for clarity
        indexes = [
            models.Index(fields=['serial']),
            models.Index(fields=['device']),
        ]
        ordering = ['created_at']

    def mark_finished(self, when=None):
        if not self.finished:
            self.finished = True
            self.finished_at = when or models.DateTimeField.auto_now_add
            self.save(update_fields=['finished', 'finished_at'])
            # update parent counts
            self.job_order._recount_devices()
            self.job_order.save(update_fields=['number_of_finished_devices', 'number_devices', 'updated_at'])

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # update parent counts after save
        try:
            self.job_order._recount_devices()
            self.job_order.save(update_fields=['number_of_finished_devices', 'number_devices', 'updated_at'])
        except Exception:
            pass

    def __str__(self):
        return f"{self.serial} ({'finished' if self.finished else 'pending'}) in {self.job_order.order_number}"
    

class Submission(models.Model):
    """
    A technician submission that must be reviewed by a supervisor.
    - device_serials: raw list provided by technician (strings)
    - device_instances: resolved DeviceInstance objects (optional, filled on submit/approve)
    - operations: operations performed
    - submitted_by: the technician user
    - status: pending / approved / rejected
    """
    STATUS_SUBMITTED = 'submitted'
    STATUS_APPROVED = 'approved'
    STATUS_REJECTED = 'rejected'
    STATUS_CHOICES = [
        (STATUS_SUBMITTED, 'Submitted'),
        (STATUS_APPROVED, 'Approved'),
        (STATUS_REJECTED, 'Rejected'),
    ]

    job_order = models.ForeignKey(JobOrder, on_delete=models.CASCADE, related_name='submissions')
    task = models.ForeignKey(Task, null=True, blank=True, on_delete=models.SET_NULL, related_name='submissions')
    operations = models.ManyToManyField(Operation, blank=True, related_name='submissions')
    completed_count = models.PositiveIntegerField(default=0)
    # total time spent by technician on this submission (minutes). Fill from frontend.
    total_time_minutes = models.PositiveIntegerField(default=0)
    # store raw serials as submitted by technician; useful for audit & review
    device_serials = models.JSONField(default=list, blank=True)
    # resolved DeviceInstance objects; can be populated when submission is created or on approval
    device_instances = models.ManyToManyField('DeviceInstance', blank=True, related_name='submissions')
    submitted_by = models.ForeignKey('User', on_delete=models.PROTECT, related_name='submissions')
    submitted_at = models.DateTimeField(auto_now_add=True)

    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default=STATUS_SUBMITTED)
    reviewed_by = models.ForeignKey('User', null=True, blank=True, on_delete=models.SET_NULL, related_name='reviews')
    reviewed_at = models.DateTimeField(null=True, blank=True)
    review_note = models.TextField(blank=True)

    class Meta:
        ordering = ['-submitted_at']

    def resolve_device_instances(self):
        """
        Try to resolve device_serials into DeviceInstance objects for this job_order.
        If a serial is missing in DB you can decide to create or skip it — here we skip creation
        and only attach existing DeviceInstance rows that match this job_order + serial.
        """
        self.device_instances.clear()
        if not self.device_serials:
            return
        resolved = []
        for s in self.device_serials:
            s_str = str(s).strip()
            if not s_str:
                continue
            try:
                di = DeviceInstance.objects.get(job_order=self.job_order, serial=s_str)
                resolved.append(di)
            except DeviceInstance.DoesNotExist:
                # skip or log - do not create automatically to avoid accidental wrong links
                continue
        if resolved:
            self.device_instances.add(*resolved)

    def approve(self, reviewer: 'User', review_note: str = ""):
        """
        Mark submission approved:
        - set status and reviewer fields
        - mark resolved DeviceInstance.finished=True
        - update job_order counts
        - update PerformanceMetric aggregates
        """
        if self.status == self.STATUS_APPROVED:
            return

        self.resolve_device_instances()
        # mark finished
        for di in self.device_instances.all():
            if not di.finished:
                di.finished = True
                di.finished_at = timezone.now()
                di.save(update_fields=['finished', 'finished_at'])

        # update submission status
        self.status = self.STATUS_APPROVED
        self.reviewed_by = reviewer
        self.reviewed_at = timezone.now()
        self.review_note = review_note or self.review_note
        self.save(update_fields=['status', 'reviewed_by', 'reviewed_at', 'review_note'])

        # recount job order
        self.job_order._recount_devices()
        self.job_order.save(update_fields=['number_devices', 'number_of_finished_devices', 'updated_at'])

        # --- update performance metrics ---
        # We'll update a metric row for the submission date + job_order.
        # Optionally you can also create per-device / per-operation rows if you have that granularity.
        date = (self.submitted_at or timezone.now()).date()
        # Use transaction to ensure atomicity
        with transaction.atomic():
            metric, created = PerformanceMetric.objects.get_or_create(
                date=date,
                job_order=self.job_order,
                device=None,
                operation=None,
                defaults={
                    'total_output': 0,
                    'total_actual_time_minutes': 0,
                    'total_standard_time_minutes': 0,
                    'productive_time_minutes': 0,
                    'available_time_minutes': 0,
                }
            )
            # increment counters atomically
            PerformanceMetric.objects.filter(pk=metric.pk).update(
                total_output=F('total_output') + self.completed_count,
                total_actual_time_minutes=F('total_actual_time_minutes') + self.total_time_minutes,
                # total_standard_time_minutes: depends on submitted operations and device standards.
                # If you can compute standard expected time for this submission, add it here.
                productive_time_minutes=F('productive_time_minutes') + self.total_time_minutes,
            )

    def reject(self, reviewer: 'User', review_note: str = ""):
        """
        Mark submission rejected: set status and reviewer. Do NOT mark devices finished.
        """
        self.status = self.STATUS_REJECTED
        self.reviewed_by = reviewer
        self.reviewed_at = timezone.now()
        self.review_note = review_note or self.review_note
        self.save(update_fields=['status', 'reviewed_by', 'reviewed_at', 'review_note'])

    def __str__(self):
        return f"Submission {self.id} by {self.submitted_by} for {self.job_order.order_number} ({self.status})"

class PerformanceMetric(models.Model):
    """
    Aggregated KPIs per date / job_order / (optional) device / operation.
    Update these records when a Submission is approved.
    Derived KPIs:
      - Productivity = total_output / total_actual_time_minutes (units per minute)
      - Efficiency = (total_standard_time_minutes / total_actual_time_minutes) * 100  (percent)
      - Utilization = (productive_time_minutes / available_time_minutes) * 100 (percent)
      - Job order progress: compute from JobOrder (no metric needed)
    """
    date = models.DateField()
    job_order = models.ForeignKey('JobOrder', on_delete=models.CASCADE, related_name='metrics')
    device = models.ForeignKey('Device', null=True, blank=True, on_delete=models.SET_NULL, related_name='metrics')
    operation = models.ForeignKey('Operation', null=True, blank=True, on_delete=models.SET_NULL, related_name='metrics')

    total_output = models.PositiveIntegerField(default=0)                    # units completed
    total_actual_time_minutes = models.PositiveIntegerField(default=0)       # sum actual time recorded
    total_standard_time_minutes = models.PositiveIntegerField(default=0)     # sum expected standard time
    productive_time_minutes = models.PositiveIntegerField(default=0)         # time counted as productive
    available_time_minutes = models.PositiveIntegerField(default=0)          # available capacity (to compute utilization)

    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = (('date', 'job_order', 'device', 'operation'),)
        indexes = [
            models.Index(fields=['date']),
            models.Index(fields=['job_order']),
        ]

    def productivity(self):
        if self.total_actual_time_minutes:
            return self.total_output / self.total_actual_time_minutes
        return 0.0

    def efficiency_percent(self):
        # efficiency = (standard / actual) * 100
        if self.total_actual_time_minutes and self.total_standard_time_minutes:
            return (self.total_standard_time_minutes / self.total_actual_time_minutes) * 100.0
        return 0.0

    def utilization_percent(self):
        if self.available_time_minutes:
            return (self.productive_time_minutes / self.available_time_minutes) * 100.0
        return 0.0

    def __str__(self):
        return f"Metrics {self.job_order.order_number} @ {self.date}"
