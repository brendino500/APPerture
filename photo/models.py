from django.db import models

# Create your models here.
class Photo(models.Model):
  location = models.CharField(max_length=60)
  image = models.CharField(max_length=400)
  created_at = models.DateTimeField(auto_now_add=True)
  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name="created_photo",
    on_delete=models.CASCADE
    )

  def __str__(self):
    return f'{self.location} | {self.created_at}'
