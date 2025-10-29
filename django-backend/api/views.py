from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.shortcuts import render
from django.utils import timezone
from datetime import timedelta

class LoginView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({"success": False, "error": "Email and password required"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=email, password=password)
        if user is None:
            return Response({"success": False, "error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # Enforce password expiry: 90 days (3 months)
        last_changed = getattr(user, 'password_changed_at', None)
        if not last_changed or (timezone.now() - last_changed > timedelta(days=90)):
            # Inform user to contact administration (no redirect)
            return Response({
                "success": False,
                "error": "password_expired",
                "message": "Your password has expired. Please contact administration to reset your password."
            }, status=status.HTTP_403_FORBIDDEN)

        role = getattr(user, "role", None)
        username = getattr(user, "username", None)
        return Response({"success": True, "role": role, "username": username}, status=status.HTTP_200_OK)
