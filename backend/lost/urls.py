from django.urls import path
from . import views

# here we are using views.viewName because we have not separatly imported each view as we have did in accounts urls.py

urlpatterns = [
    path('get_lost_items/', views.getLostItemsView),
    path('add_lost_items/', views.addLostItemsView),
    path('total_lost_items/', views.totalLostView),
]
