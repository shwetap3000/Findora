from rest_framework import serializers
from .models import Found

class FoundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Found
        fields = "__all__"