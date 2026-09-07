from django.urls import path

from .views import (
    CreateAppointmentView,
    MyAppointmentsView,
)

urlpatterns = [
    path(
        "create/",
        CreateAppointmentView.as_view(),
        name="create-appointment",
    ),
    path(
        "my/",
        MyAppointmentsView.as_view(),
        name="my-appointments",
    ),
]