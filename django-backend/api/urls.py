from django.urls import path
from django.http import JsonResponse
from .views import LoginView

def health(request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path("health/", health, name="health"),
    path("auth/login/", LoginView.as_view(), name="api-login"),
]