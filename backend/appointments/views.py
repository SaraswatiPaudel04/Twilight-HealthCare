from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Appointment
from .serializers import AppointmentSerializer


class CreateAppointmentView(generics.CreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            patient=self.request.user
        )


class MyAppointmentsView(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(
            patient=self.request.user
        ).select_related(
            "doctor__user"
        ).order_by(
            "-appointment_date",
            "-appointment_time"
        )