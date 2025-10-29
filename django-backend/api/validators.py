from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

class MinimumLengthValidator:
    def __init__(self, min_length=20):
        self.min_length = min_length

    def validate(self, password, user=None):
        if not password or len(password) < self.min_length:
            raise ValidationError(
                _(f"This password must contain at least {self.min_length} characters."),
                code='password_too_short',
            )
        
    def get_help_text(self):
        return _(f"Your password must contain at least {self.min_length} characters.")
