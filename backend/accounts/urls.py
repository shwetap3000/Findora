from django.urls import path
from .views import RegisterView, LoginView, ProfileView, TotalUsersView

urlpatterns = [
    path('register/', RegisterView),
    path('login/', LoginView),
    path('profile/', ProfileView),
    path('total_users/', TotalUsersView),
]





# for class based view
# urlpatterns = [
#     path('register/', RegisterView.as_view()),
#     path('login/', LoginView.as_view()),
# ]
