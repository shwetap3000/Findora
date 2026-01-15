from django.shortcuts import render
from django.http import HttpResponse
from .models import Found
from rest_framework import serializers, status
from .serializers import FoundSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

# view to get data from the database
@api_view(['GET'])
def getFoundItemsView(request):
    if (request.method == 'GET'):
        found_items = Found.objects.all()
        serializers = FoundSerializer(found_items, many=True)

        return Response(serializers.data, status=status.HTTP_200_OK)

# view to get data from the frontend and save it in the database
@api_view(['POST'])
def addFoundItemsView(request):
    serializer = FoundSerializer(data = request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_308_PERMANENT_REDIRECT)


@api_view(['GET'])
def totalFoundView(request):
    found_items_count = Found.objects.count()

    return Response({
        'total_found_items': found_items_count
    })