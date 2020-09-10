from rest_framework import serializers

from comments.serializers import PopulatedCommentSerializer, UserSerializer
from .models import Photo

class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photo
        fields = '__all__'

class PopulatedPhotoSerializer(PhotoSerializer):

    owner = UserSerializer()
    comments = PopulatedCommentSerializer(many=True)
