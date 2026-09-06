from django.urls import path

from .views import MyDoctorProfileView




from .views import (
    MyDoctorProfileView,
    DoctorListView,
)


urlpatterns = [

    path(
        "profile/",
        MyDoctorProfileView.as_view(),
        name="doctor-profile",
    ),

    path(
        "list/",
        DoctorListView.as_view(),
        name="doctor-list",
    ),
]