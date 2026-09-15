from django.urls import path

from .views import (
    CreateAppointmentView,
    MyAppointmentsView,
    AllAppointmentsView,
    ConfirmAppointmentView,
    CancelAppointmentView,
    DoctorAppointmentsView,
)


urlpatterns = [

    # Patient
    path(
        "create/",
        CreateAppointmentView.as_view(),
        name="create-appointment"
    ),

    path(
        "my/",
        MyAppointmentsView.as_view(),
        name="my-appointments"
    ),

    # Receptionist
    path(
        "all/",
        AllAppointmentsView.as_view(),
        name="all-appointments"
    ),

    path(
        "<int:pk>/confirm/",
        ConfirmAppointmentView.as_view(),
        name="confirm-appointment"
    ),

    path(
        "<int:pk>/cancel/",
        CancelAppointmentView.as_view(),
        name="cancel-appointment"
    ),

    path(
        "doctor/",
        DoctorAppointmentsView.as_view(),
        name="doctor-appointments"
    ),
]