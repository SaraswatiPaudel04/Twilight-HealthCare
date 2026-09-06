from django.contrib import admin
from .models import DoctorProfile, Department


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "description",
    )
    search_fields = (
        "name",
    )


@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "specialization",
        "department",
        "experience",
        "consultation_fee",
    )

    list_filter = (
        "specialization",
        "department",
    )

    search_fields = (
        "user__username",
        "user__first_name",
        "user__last_name",
        "specialization",
    )