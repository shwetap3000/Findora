from django.urls import path
from .views import RegisterView, LoginView

urlpatterns = [
    path('register/', RegisterView),
    path('login/', LoginView),
]





# for class based view
# urlpatterns = [
#     path('register/', RegisterView.as_view()),
#     path('login/', LoginView.as_view()),
# ]
