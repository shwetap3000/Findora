```python

# we import APIView to create class based api views that can handle HTTP request (GET, POST, DELETE, PUT) and return JSON responses instead of html
# apiview lets us build rest apis that accepts json request, user serializers, an return json responses with proper authenticaton and status code
# normal views return html templates and are meant for web pages
# authentication apis need : post request, json input, token handling, status code and apiview supports all of this cleanly
from rest_framework.views import APIView

# we import response to send json data with proper http status code from an api view
# httpresponse return plain text and doesnt automatically converts python data to json and ti doesnt intergrate with serializers but response do
from rest_framework.response import Response

# is used to send proper http status code in a readable and standard way when returning api responses
from rest_framework import status

from .serializers import RegisterSerializer, LoginSerializer


# =========================
# SIGNUP VIEW
# =========================


# register view receives signup data, validates it using a serializer, creates a user securly and returns proper success or error response
# creating an API endpoint. This allows backend to receive http request (POST, GET, etc.) and return JSON responses
class RegisterView(APIView):

    # this function runs when a POST request hits this api
    # here post is not a random name, it represents the http post method
    # we use post method for signup bcoz it creates a new user (new data) and post is used for same
    # request contains request.data where data is sent front from the frontend (json)
    def post(self, request):

        # this line take frontend data and pass it to the serializer for validation
        serializer = RegisterSerializer(data=request.data)

        # check for valid data (return true if everything is fine else return false)
        if serializer.is_valid():

            # this calls the serializer's create() method and create 
            # inside create(), password gets hashed and user is saved in database, the post_save signal runs and profile gets created automatically (all this happens internally)
            serializer.save()

            # sends json response
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )

        # if validation fails, it returns error message
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# LOGIN VIEW
# =========================
class LoginView(APIView):

    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            return Response(
                {"message": "Login successful"},
                status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```





```python

# this line ask SimpleJWT to create a jwt token set for this (authenticated) user
# internally simpleiwt takes the user's id, adds expiry time, signs it with secret key, builds a refresh token and inside it also creates an access token
# so after this line 'refresh' is an object that contains a refresh token and also an ancess token
refresh = RefreshToken.for_user(user)

    # sending everything back to frontend
    return Response({

        # str converts the refresh token object into the actual token string like : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
        "access": str(refresh.access_token),
        "refresh": str(refresh),

        # this is not authentication, it just allows frontend to instantly know who logged in, what username to show, etc..
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username
        }
    }, status=status.HTTP_200_OK)
```





```python

# permission_classes tells django that 'who is allowed to access this api?'
# without permission classes anyone on the internet can call this api even without login and without token
# it only allow requests that have a valid jwt token and a real logged in user (private api)
# tells : 'before running this api, check who is allowed and who is blocked
from rest_framework.decorators import api_view, permission_classes

# this is a gatekeeper, it means only allow the api if it comes from the logged-in user and the request must contain a valid access token
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response

@api_view(['GET'])

# this is the lock on the api door
# this api can only be accessed by user who send a valid access token
@permission_classes([IsAuthenticated])
def profile_view(request):
    user = request.user

    return Response({
        "id": user.id,
        "email": user.email,
        "username": user.username
    })
```