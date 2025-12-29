from django.shortcuts import render
from django.http import JsonResponse
from backend_app.models import Student
from .serializers import StudentSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view


# # Static data
# def studentView(request):
#     student = {
#             'id' : 1,
#             'name' : "Shweta",
#             'age' : 20,
#         } 
        

#     return JsonResponse(student)

# Dynamic data
@api_view(['GET' , 'POST'])
def StudentsView(request):
    if (request.method == 'GET'):
        # here student is the variable which is storing all the objects and Student is the model name
        students = Student.objects.all()
        serializers = StudentSerializer(students , many=True)
        return Response(serializers.data , status=status.HTTP_200_OK)
    
    elif (request.method == 'POST'):
        serializers = StudentSerializer(data = request.data)
        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data , status=status.HTTP_201_CREATED)
        return Response(serializers.errors , status=status.HTTP_400_BAD_REQUEST)
    

# To get the data of a particular id
@api_view(['GET' , 'PUT' , 'DELETE'])
def StudentView(request , pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if (request.method == 'GET'):
        serializers = StudentSerializer(student)
        return Response(serializers.data , status=status.HTTP_200_OK)
    
    elif (request.method == 'PUT'):
        serializers = StudentSerializer(student , data=request.data)

        if serializers.is_valid():
            serializers.save()
            return Response(serializers.data , status=status.HTTP_200_OK)
        return Response( serializers.errors , status=status.HTTP_400_BAD_REQUEST)
    
    elif (request.method == 'DELETE'):
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)






    # students = Student.objects.all()
    # print(students)

    # # Not recommended for big datasets (soln is serializers)
    # students_list = list(students.values())
    # return JsonResponse(students_list , safe=False)


