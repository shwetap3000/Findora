from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Claim
from .serializers import ClaimSerializer, ClaimListSerializer,MyClaimSerializer
from found.models import Found



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_claim(request, found_item_id):
    found_item = get_object_or_404(Found, id=found_item_id)

    # # this will prevent claiming ur own item
    # if found_item.reported_by == request.user:
    #     return Response(
    #         {"detail": "You cannot claim your own item."},
    #         status=status.HTTP_400_BAD_REQUEST 
    #     )
    
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



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_claims_for_finder(request):
    """
    Returns all claims for items posted by the logged-in user
    """

    claims = Claim.objects.filter(
        found_item__reported_by=request.user
    ).select_related('claimant', 'found_item').order_by('-created_at')

    response_data = []

    for claim in claims:
        data = ClaimListSerializer(claim).data 

        if claim.status != 'approved':
            data['contact_email'] = None 
            data['contact_phone'] = None 

        response_data.append(data)

    return Response(response_data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_claim_status(request, claim_id):
    claim = get_object_or_404(Claim, id=claim_id)

    # Only the finder (item owner) can update
    if claim.found_item.reported_by != request.user:
        return Response(
            {"detail": "You are not allowed to update this claim"},
            status=status.HTTP_403_FORBIDDEN
        )

    # Claim must be pending
    if claim.status != 'pending':
        return Response(
            {"detail": "This claim has already been processed"},
            status=status.HTTP_400_BAD_REQUEST
        )

    new_status = request.data.get('status')

    if new_status not in ['approved', 'rejected']:
        return Response(
            {"detail": "Invalid status"},
            status=status.HTTP_400_BAD_REQUEST
        )

    claim.status = new_status
    claim.save()

    return Response(
        {"message": f"Claim {new_status} successfully"},
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_claims(request):
    """
    Returns all claims made by the logged-in user
    """

    claims = Claim.objects.filter(
        claimant=request.user
    ).select_related('found_item').order_by('-created_at')

    serializer = MyClaimSerializer(claims, many=True)
    return Response(serializer.data)
