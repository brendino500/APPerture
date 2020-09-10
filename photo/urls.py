from django.urls import path
from .views import PhotoListView, PhotoDetailView

urlpatterns = [
    path('', PhotoListView.as_view()),
    path('<int:pk>/', PhotoDetailView.as_view())
]
