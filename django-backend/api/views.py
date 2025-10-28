from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.shortcuts import render

class LoginView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self,  request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({"success": False, "error": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(request, username=email, password=password)
        if user is None:
            return Response({"success": False, "error": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)
        role = getattr(user, "role", None)
        username = getattr(user, "username", "")
        print("role:", role)
        return Response({"success": True, "role": role, "username": username}, status=status.HTTP_200_OK)
