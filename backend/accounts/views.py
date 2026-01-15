from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authentication import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import UserModel


@api_view(['POST'])
def RegisterView(request):
    print(request.data)
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
    print(request.data)
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ProfileView(request):
    user = request.user

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email
    })


# view to get the number of active users
@api_view(['GET'])
# @permission_classes([IsAuthenticated])  --> we use this when we have to keep the data private to the logged-in users only but in our case we will keep it public so that everyone can see it
def TotalUsersView(request):
    users_count = UserModel.objects.count()

    return Response({
        # this name should exactly written when fetching the data
        'total_users': users_count
    })




# @api_view(['POST'])
# def LoginView(request):

#     # receving data in form of {'username': .. , 'password' : ..}
#     print(request.data)
#     print(request.data.get('email'))
#     print(request.data.get('password'))

#     # the email is getting stored in username variable (by default) hence we have used 'username' here and not 'email'
#     email = request.data.get('email')
#     password = request.data.get('password')

#     if not email or not password:
#         return Response(
#             {'message': 'Email and password are required.'},
#             status=status.HTTP_400_BAD_REQUEST 
#         )
    
#     user = authenticate(
#         email = email,
#         # username = email,
#         password = password
#     )

#     if user is None:
#         return Response(
#             {'message': 'Invalid Credentials'},
#             status=status.HTTP_400_BAD_REQUEST
#         )
    
#     refresh = RefreshToken.for_user(user)

#     return Response(
#         {
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),

#             # 'user': {
#             #     'id': user.id,
#             #     'email': user.email,
#             #     'username': user.username 
#             # }

#         },
#         status=status.HTTP_200_OK
#     )













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

