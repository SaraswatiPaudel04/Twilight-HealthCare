from datetime import date

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

    def validate(self, data):

        appointment_date = data.get("appointment_date")
        appointment_time = data.get("appointment_time")
        doctor = data.get("doctor")

        # Prevent past appointments
        if appointment_date < date.today():
            raise serializers.ValidationError({
                "appointment_date": "You cannot book an appointment for a past date."
            })

        # Prevent duplicate appointment slot
        existing = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=appointment_date,
            appointment_time=appointment_time,
        ).exclude(
            status=Appointment.Status.CANCELLED
        )

        if existing.exists():
            raise serializers.ValidationError({
                "appointment_time": "This doctor already has an appointment at this time."
            })

        return data