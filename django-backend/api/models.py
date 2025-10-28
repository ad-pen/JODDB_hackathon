from django.contrib.auth.models import AbstractUser
from django.db import models

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
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Task {self.id} for Job Order {self.job_order.id}"

class Operation(models.Model):
    name = models.CharField(max_length=100)
    minimum_output = models.PositiveIntegerField()
    standard_time = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
class JobOrder(models.Model):
    order_number = models.CharField(max_length=100, unique=True)
    number_devices = models.PositiveIntegerField()
    number_of_finished_devices = models.PositiveIntegerField(default=0)
    devices = models.JSONField(default=list)  # list of {"serial_number": str, "status": str}
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Job Order {self.order_number}"
    
    