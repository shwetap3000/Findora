from rest_framework import serializers
from .models import Claim

class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = ['id', 'claim_message', 'contact_email', 'contact_phone']

    def validate(self, data):
        if not data.get('contact_email') and not data.get('contact_phone'):
            raise serializers.ValidationError(
                "Provide at least phone or email."
            )
        return data

class ClaimListSerializer(serializers.ModelSerializer):
    claimant_name = serializers.CharField(
        source='claimant.username',
        read_only=True 
    )

    class Meta:
        model = Claim
        fields = [
            'id', 'claimant_name', 'claim_message', 'status', 'created_at', 'contact_email', 'contact_phone'
        ]


class MyClaimSerializer(serializers.ModelSerializer):
    item_title = serializers.CharField(
        source='found_item.title',
        read_only=True
    )

    item_id = serializers.IntegerField(
        source='found_item.id',
        read_only=True
    )

    class Meta:
        model = Claim
        fields = [
            'id',
            'item_id',
            'item_title',
            'claim_message',
            'status',
            'created_at'
        ]
