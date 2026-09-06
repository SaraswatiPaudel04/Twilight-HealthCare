from django.urls import path

from .views import MyDoctorProfileView


urlpatterns = [
    path(
        "profile/",
        MyDoctorProfileView.as_view(),
        name="doctor-profile",
    ),
]