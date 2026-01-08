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