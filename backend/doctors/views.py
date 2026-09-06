from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import DoctorProfile
from .serializers import DoctorProfileSerializer


class MyDoctorProfileView(generics.RetrieveUpdateAPIView):

    serializer_class = DoctorProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return DoctorProfile.objects.get(
            user=self.request.user
        )