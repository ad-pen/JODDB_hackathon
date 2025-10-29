from django.contrib.auth import authenticate, get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
import logging

logger = logging.getLogger(__name__)
User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    payload = request.data if hasattr(request, 'data') else {}
    username = (payload.get('username') or '').strip()
    email = (payload.get('email') or '').strip()
    password = payload.get('password')

    logger.debug("login attempt fields present: username=%s email=%s password_provided=%s",
                 bool(username), bool(email), bool(password))

    if not password or (not username and not email):
        return Response({'detail': 'email/username and password required'}, status=status.HTTP_400_BAD_REQUEST)

    # Resolve to the actual username value that authenticate expects
    if not username and email:
        try:
            user_obj = User.objects.get(email__iexact=email)
            # get the value used as username for this user model
            username = getattr(user_obj, User.USERNAME_FIELD)
            logger.debug("resolved email %s -> %s_field=%s", email, User.USERNAME_FIELD, username)
        except User.DoesNotExist:
            logger.debug("no user with email %s", email)
            return Response({'detail': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)

    # Authenticate (Django's default authenticate expects 'username' kwarg)
    user = authenticate(request, username=username, password=password)
    if user is None:
        logger.debug("authentication failed for username/email: %s / %s", username, email)
        return Response({'detail': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)

    if not getattr(user, 'is_active', True):
        logger.debug("inactive user attempted login: %s", username)
        return Response({'detail': 'User account is disabled.'}, status=status.HTTP_403_FORBIDDEN)

    token, _ = Token.objects.get_or_create(user=user)
    role = getattr(user, 'role', None)
    user_data = {'id': user.id, 'username': user.get_username(), 'role': role}

    logger.info("login success user=%s id=%s role=%s", user.get_username(), user.id, role)
    return Response({'token': token.key, 'user': user_data}, status=status.HTTP_200_OK)
