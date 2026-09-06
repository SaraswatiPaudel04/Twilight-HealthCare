from django.urls import include, path

from .views import MyPatientProfileView


urlpatterns = [
    path(
    "profile/",
    MyPatientProfileView.as_view(),
    name="patient-profile",
),
]