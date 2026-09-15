from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Appointment
from .serializers import AppointmentSerializer


# Create Appointment - Patient
class CreateAppointmentView(generics.CreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)


# Patient's Appointments
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


# Receptionist - View All Appointments
class AllAppointmentsView(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role != "RECEPTIONIST":
            return Appointment.objects.none()

        return Appointment.objects.select_related(
            "patient",
            "doctor__user"
        ).order_by(
            "-appointment_date",
            "-appointment_time"
        )


# Receptionist - Confirm Appointment
class ConfirmAppointmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        if request.user.role != "RECEPTIONIST":
            return Response(
                {"detail": "Only receptionists can confirm appointments."},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            appointment = Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            return Response(
                {"detail": "Appointment not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        appointment.status = Appointment.Status.CONFIRMED
        appointment.save()

        return Response(
            AppointmentSerializer(appointment).data,
            status=status.HTTP_200_OK
        )


# Receptionist - Cancel Appointment
class CancelAppointmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):

        if request.user.role != "RECEPTIONIST":
            return Response(
                {"detail": "Only receptionists can cancel appointments."},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            appointment = Appointment.objects.get(pk=pk)
        except Appointment.DoesNotExist:
            return Response(
                {"detail": "Appointment not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        appointment.status = Appointment.Status.CANCELLED
        appointment.save()

        return Response(
            AppointmentSerializer(appointment).data,
            status=status.HTTP_200_OK
        )


class DoctorAppointmentsView(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role != "DOCTOR":
            return Appointment.objects.none()

        return Appointment.objects.filter(
            doctor__user=self.request.user
        ).select_related(
            "patient",
            "doctor__user"
        ).order_by(
            "-appointment_date",
            "-appointment_time"
        )