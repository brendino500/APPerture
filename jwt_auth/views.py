from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

from .serializers import UserSerializer, PopulatedUserSerializer
User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        created_user = UserSerializer(data=request.data)
        if created_user.is_valid():
            created_user.save()
            return Response({'message': 'Registration Succesful'}, status=status.HTTP_201_CREATED)
        return Response(created_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid Credentials'})

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid Credentials'})
        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {'sub': user.id, 'exp': int(dt.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )
        return Response({'token': {token}, 'message': f'Welcome back {user.username}'})

class ProfileView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request, pk):
        user = User.objects.get(pk=pk)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data)

    def post(self, request, pk):
        followed_user = User.objects.get(pk=pk)
        followed_user.followers.add(request.user.id)
        serialized_followed_user = PopulatedUserSerializer(followed_user)
        return Response(serialized_followed_user.data)

    def put(self, request, pk):
        user_to_update = User.objects.get(pk=pk)
        # user_to_update.is_user_owner(user_to_update, request.user)
        updated_user = UserSerializer(user_to_update, data=request.data)
        if updated_user.is_valid():
            updated_user.save()
            return Response(updated_user.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_user.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class OwnUserProfileView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request, pk):
        user = User.objects.get(pk=request.user.id)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data)

class ProfileListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, request):
        users = User.objects.all()
        serialized_users = PopulatedUserSerializer(users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)
