from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("admin/", admin.site.urls),

    path(
        "api/",
        include("api.urls"),
    ),

    path(
        "api/auth/",
        include("accounts.urls"),
    ),

    path(
        "api/patient/",
        include("patients.urls"),
    ),

    path(
        "api/doctor/",
        include("doctors.urls"),
    ),

    path(
    "api/appointments/",
    include("appointments.urls")
),
    
]