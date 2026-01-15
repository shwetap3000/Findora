from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from . models import Lost
from . serializers import LostSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# decorators to specify the type of method
@api_view(['GET'])
def getLostItemsView(request):
    if (request.method == 'GET'):
        # fetching all the data from the database
        lost_items = Lost.objects.all()

        # converting query objects (of fetched data) into json format
        serializer = LostSerializer(lost_items, many=True)      # many=True because there will be many items
        return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['POST'])
def addLostItemsView(request):
    serializer = LostSerializer(data = request.data)

    # Serializer only accepts field names that exactly match model fields
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def totalLostView(request):
    lost_items_count = Lost.objects.count()

    return Response({
        'total_lost_items' : lost_items_count,
    })


# # post method to get data from frontend (not saving into database yet.. just printing data in the terminal)
# @api_view(['POST'])
# def addLostItemsView(request):
#     if (request.method == 'POST'):
#         data = request.data
#         print(data)
#         return Response("Data receied successfully", status=status.HTTP_201_CREATED)



# # Static data -- added manually
# def LostView(request):
#     items = {
#         'id': 1, 
#         'title': "DSA notebook",
#         'desc': "A blue cover page",
#     }

#     return JsonResponse(items)



# # Dynamic data -- get fetched from the database
# def LostView(request):
#     lost_items = Lost.objects.all()
#     print(lost_items)

#     # By default JsonResponse assuses that we are sending dictionary -- hence getting error as : In order to allow non-dict objects to be serialized set the safe parameter to False.
#     # Here lost_items is a non-dict object - it is a query set 
#     # The very first solution is to convert all the lost_items into a list and pass it into the JsconResponse but it is not recommended for last data set hence we use serializers

#     lost_items_list = list(lost_items.values())
#     return JsonResponse(lost_items_list, safe=False)    # we are passing list not dict hence set 'safe=False'