
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Photo
from .serializers import PopulatedPhotoSerializer, PhotoSerializer

class PhotoListView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        photos = Photo.objects.all()
        serialized_photos = PopulatedPhotoSerializer(photos, many=True)
        return Response(serialized_photos.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        new_photo = PhotoSerializer(data=request.data)
        if new_photo.is_valid():
            new_photo.save()
            return Response(new_photo.data, status=status.HTTP_201_CREATED)
        return Response(new_photo.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class PhotoDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_photo(self, pk):
        try:
            return Photo.objects.get(pk=pk)
        except Photo.DoesNotExist:
            raise NotFound()

    def is_photo_owner(self, photo, user):
        if photo.owner.id != user.id:
            raise PermissionDenied()

    def get(self, _request, pk):
        photo = self.get_photo(pk)
        serialized_photo = PopulatedPhotoSerializer(photo)
        return Response(serialized_photo.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        photo_to_update = self.get_photo(pk=pk)
        self.is_photo_owner(photo_to_update, request.user)
        updated_photo = PhotoSerializer(photo_to_update, data=request.data)
        if updated_photo.is_valid():
            updated_photo.save()
            return Response(updated_photo.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_photo.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        photo_to_delete = self.get_photo(pk=pk)
        self.is_photo_owner(photo_to_delete, request.user)
        photo_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
