from django.urls import path
from .views import RegisterView, LoginView, ProfileView, TotalUsersView, ForgotPasswordView, ResetPasswordView

urlpatterns = [
    path('register/', RegisterView),
    path('login/', LoginView),
    path('profile/', ProfileView),
    path('total_users/', TotalUsersView),
    path('forgot-password/', ForgotPasswordView),
    path('reset-password/<str:token>/', ResetPasswordView),
]





# for class based view
# urlpatterns = [
#     path('register/', RegisterView.as_view()),
#     path('login/', LoginView.as_view()),
# ]
