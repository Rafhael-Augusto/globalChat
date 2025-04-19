from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import MessageView, post_message
from . import views

urlpatterns = [
    path('messages/', MessageView.as_view(), name='message-list'),
    path('messages/get/', views.get_messages, name='get-messages'),
    path('messages/post/', post_message),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]