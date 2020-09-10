from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

from photo.serializers import PhotoSerializer
from comments.serializers import CommentSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')
        if password != password_confirmation:
            raise ValidationError({'password_confirmation': 'does not match'})
        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = '__all__'

class PopulatedUserSerializer(UserSerializer):
    created_photo = PhotoSerializer(many=True)
    comments_made = CommentSerializer(many=True)

