from rest_framework import serializers
from . models import Lost

class LostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lost
        # We want all the fields hence used '__all__' else we would have used 'fields = ['id', 'title', etc.]'
        fields = "__all__"