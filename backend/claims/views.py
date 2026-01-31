from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Claim
from .serializers import ClaimSerializer
from found.models import Found



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_claim(request, found_item_id):
    found_item = get_object_or_404(Found, id=found_item_id)

    # this will prevent claiming ur own item
    if found_item.reported_by == request.user:
        return Response(
            {"detail": "You cannot claim your own item."},
            status=status.HTTP_400_BAD_REQUEST 
        )
    
    # this will prevent duplicate claims
    if Claim.objects.filter(
        claimant=request.user,
        found_item=found_item
    ).exists():
        return Response(
            {"detail": "You have already claimed this item."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    serializer = ClaimSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(
            claimant=request.user,
            found_item=found_item
        )

        return Response(
            {"message": "Claim submitted successfully."},
            status=status.HTTP_201_CREATED
        )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

