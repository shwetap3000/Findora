from django.urls import path
from . import views

urlpatterns = [
    path('students/' , views.StudentsView),   #the forward slash is must at the end of the path
    path('students/<int:pk>' , views.StudentView)
]
