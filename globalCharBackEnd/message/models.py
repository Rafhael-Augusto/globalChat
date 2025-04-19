from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Message(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    attachment = models.FileField(blank=True, null=True)
    avatar = models.ImageField(blank=True, null=True)