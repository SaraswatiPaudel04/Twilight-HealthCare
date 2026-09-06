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
        "qualification",
        "department",
        "experience",
        "consultation_fee",
    )

    list_filter = (
        "department",
        "specialization",
    )

    search_fields = (
        "user__username",
        "user__first_name",
        "user__last_name",
        "user__email",
        "specialization",
    )

    ordering = (
        "user__first_name",
    )