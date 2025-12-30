from rest_framework import serializers
from . models import Lost

class LostSerializer(serializers.ModelSerializer):

    # using name control we can change the field names while sending data to frontend
    # example: changing 'location_lost' to 'venue'
    # venue = serializers.CharField(source="location_lost")


    class Meta:
        model = Lost
        # We want all the fields hence used '__all__' else we would have used 'fields = ['id', 'title', etc.]'
        fields = "__all__"