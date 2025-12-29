from django.shortcuts import render
from django.http import HttpResponse
from .models import Found
from rest_framework import serializers, status
from .serializers import FoundSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def FoundView(request):
    if (request.method == 'GET'):
        found_items = Found.objects.all()
        serializers = FoundSerializer(found_items, many=True)

        return Response(serializers.data, status=status.HTTP_200_OK)

# def FoundView(request):
#     return HttpResponse('<h2>Found Page</h2>')
