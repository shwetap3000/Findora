from django.shortcuts import render
from django.http import HttpResponse

def students(request):
    students = [
        {
        'id': 1,
        'name': "Shweta",
        'age': 20,
        }
    ]

    return HttpResponse(students)
    # return HttpResponse('<h2>Hello World</h2>')

