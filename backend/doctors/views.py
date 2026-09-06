from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied

from .models import DoctorProfile
from .serializers import DoctorProfileSerializer


class MyDoctorProfileView(generics.RetrieveUpdateAPIView):

    serializer_class = DoctorProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):

        if self.request.user.role != "DOCTOR":
            raise PermissionDenied(
                "Only doctors can access this profile."
            )

        profile, created = DoctorProfile.objects.get_or_create(
            user=self.request.user,
            defaults={
                "specialization": "General Medicine"
            }
        )

        return profile