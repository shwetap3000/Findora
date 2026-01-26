from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authentication import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import UserModel, PasswordResetToken
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from django.core.mail import send_mail
from django.conf import settings
import secrets


User = get_user_model()

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


# ForgotPasswordView -> request a reset
# ResetPasswordView -> actually changes the password


@api_view(['POST'])
def ForgotPasswordView(request):
    email = request.data.get("email")
    print(email)

    if not email:
        return Response(
            {"error": "Email is required."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = User.objects.get(email=email)

    except User.DoesNotExist:
        return Response(
            {"message": "If user exists, a link has been sent."},
            status=status.HTTP_200_OK
        )
    
    # This line creates a strong, random string that attackers cannot guess, and that can safely be sent inside a password reset link.  32 meansit generates 32 random bytes
    token = secrets.token_urlsafe(32)
    expires_at = timezone.now() + timedelta(minutes=15)

    reset_link = f"http://localhost:3000/reset-password/{token}"

    send_mail(
        subject="Reset your password",
        message=f"Click the link to reset your password:\n{reset_link}",
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[email],
        fail_silently=False,
    )


    PasswordResetToken.objects.create(
        user=user,
        token=token,
        expires_at=expires_at
    )

    return Response(
        {'message' : "If the email exists, a reset link has been sent."},
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
def ResetPasswordView(request, token):
    password = request.data.get("password")
    confirm_password = request.data.get("confirm_password")

    # Check if passwords exist
    if not password or not confirm_password:
        return Response(
            {"error": "Both password fields are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Check if passwords match
    if password != confirm_password:
        return Response(
            {"error": "Passwords do not match."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        reset_obj = PasswordResetToken.objects.get(token=token)
    except PasswordResetToken.DoesNotExist:
        return Response(
            {"error": "Invalid or expired token."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Check if token expiry
    if reset_obj.expires_at < timezone.now():
        reset_obj.delete()
        return Response(
            {"error": "Token has expired."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Update password
    user = reset_obj.user
    user.set_password(password)   # IMPORTANT
    user.save()

    reset_obj.delete()

    return Response(
        {"message": "Password reset successful."},
        status=status.HTTP_200_OK
    )

    




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

