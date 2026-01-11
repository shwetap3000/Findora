from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authentication import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


@api_view(['POST'])
def RegisterView(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            {'message': 'User Registered successfully'},
            status=status.HTTP_201_CREATED
        )
    
    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])
def LoginView(request):

    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response(
            {'message': 'Email and password are required.'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = authenticate(
        email = email,
        password = password
    )

    if user is None:
        return Response(
            {'message': 'Invalid Credentials'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    refresh = RefreshToken.for_user(user)

    return Response(
        {
            'refresh': str(refresh),
            'access': str(refresh.access_token),

            # 'user': {
            #     'id': user.id,
            #     'email': user.email,
            #     'username': user.username
            # }

        },
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ProfileView(request):
    user = request.user

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email
    })











# CLASS BASED VIEW
# class RegisterView(APIView):

#     def post(self, request):
#         serializer = RegisterSerializer(data=request.data)

#         if serializer.is_valid():
#             serializer.save()

#             return Response(
#                 {'message': 'User created successfully'}, 
#                 status=status.HTTP_201_CREATED
#                 )
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        
    

# class LoginView(APIView):

#     def post(self, request):
#         serializer = LoginSerializer(data=request.data)

#         if serializer.is_valid():
#             return Response(
#                 {'message': 'Login successfully'},
#                 status=status.HTTP_200_OK
#             )
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

