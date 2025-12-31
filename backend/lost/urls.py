from django.urls import path
from . import views

urlpatterns = [
    path('get_lost_items/', views.getLostItemsView),
    path('add_lost_items/', views.addLostItemsView),
]
