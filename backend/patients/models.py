from django.conf import settings
from django.db import models


class PatientProfile(models.Model):

    GENDER_CHOICES = [
        ("MALE", "Male"),
        ("FEMALE", "Female"),
        ("OTHER", "Other"),
    ]

    BLOOD_GROUP_CHOICES = [
        ("A+", "A+"),
        ("A-", "A-"),
        ("B+", "B+"),
        ("B-", "B-"),
        ("AB+", "AB+"),
        ("AB-", "AB-"),
        ("O+", "O+"),
        ("O-", "O-"),
    ]

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="patient_profile",
    )

    date_of_birth = models.DateField(
        null=True,
        blank=True,
    )

    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES,
        blank=True,
    )

    blood_group = models.CharField(
        max_length=3,
        choices=BLOOD_GROUP_CHOICES,
        blank=True,
    )

    address = models.TextField(
        blank=True,
    )

    emergency_contact = models.CharField(
        max_length=15,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f"Patient: {self.user.username}"