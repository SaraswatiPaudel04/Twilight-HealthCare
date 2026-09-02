from django.conf import settings
from django.db import models


class DoctorProfile(models.Model):

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="doctor_profile",
    )

    specialization = models.CharField(
        max_length=100,
    )

    qualification = models.CharField(
        max_length=200,
        blank=True,
    )

    experience = models.PositiveIntegerField(
        default=0,
        help_text="Experience in years",
    )

    department = models.CharField(
        max_length=100,
        blank=True,
    )

    consultation_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0,
    )

    bio = models.TextField(
        blank=True,
    )

    profile_image = models.ImageField(
        upload_to="doctors/",
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f"Dr. {self.user.get_full_name()}"