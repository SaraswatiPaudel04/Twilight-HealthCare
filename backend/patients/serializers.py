from rest_framework import serializers

from .models import PatientProfile


class PatientProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True,
    )

    email = serializers.EmailField(
        source="user.email",
        read_only=True,
    )

    first_name = serializers.CharField(
        source="user.first_name",
    )

    last_name = serializers.CharField(
        source="user.last_name",
    )

    phone = serializers.CharField(
        source="user.phone",
    )

    class Meta:
        model = PatientProfile

        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "phone",
            "date_of_birth",
            "gender",
            "blood_group",
            "address",
            "emergency_contact",
        ]

    def update(self, instance, validated_data):

        user_data = validated_data.pop("user", {})

        user = instance.user

        user.first_name = user_data.get(
            "first_name",
            user.first_name,
        )

        user.last_name = user_data.get(
            "last_name",
            user.last_name,
        )

        user.phone = user_data.get(
            "phone",
            user.phone,
        )

        user.save()

        return super().update(
            instance,
            validated_data,
        )