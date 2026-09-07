from rest_framework import serializers
from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(
        source="doctor.user.get_full_name",
        read_only=True
    )

    doctor_specialization = serializers.CharField(
        source="doctor.specialization",
        read_only=True
    )

    patient_name = serializers.CharField(
        source="patient.get_full_name",
        read_only=True
    )

    class Meta:
        model = Appointment
        fields = [
            "id",
            "patient",
            "patient_name",
            "doctor",
            "doctor_name",
            "doctor_specialization",
            "appointment_date",
            "appointment_time",
            "reason",
            "status",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "patient",
            "status",
            "created_at",
            "updated_at",
        ]