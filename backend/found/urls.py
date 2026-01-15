from django.urls import path
from . import views

urlpatterns = [
    path('get_found_items/', views.getFoundItemsView),
    path('add_found_items/', views.addFoundItemsView),
    path('total_found_items/', views.totalFoundView),
]
