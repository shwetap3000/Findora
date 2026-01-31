from django.urls import path
from .views import create_claim

urlpatterns = [
    path(
        'create/<int:found_item_id>/',
        create_claim,
        name='create_claim'
    )
]
