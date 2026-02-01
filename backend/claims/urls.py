from django.urls import path
from .views import create_claim, list_claims_for_finder, update_claim_status, my_claims

urlpatterns = [
    path('create/<int:found_item_id>/', create_claim),
    path('my-items/claims/', list_claims_for_finder),
    path('update/<int:claim_id>/', update_claim_status),
    path('my-claims/', my_claims, name='my-claims'),
]
