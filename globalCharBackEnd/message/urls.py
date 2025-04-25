from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import MessageView, post_message, get_user_info, RegisterView, delete_message, update_message
from . import views

urlpatterns = [
    path('messages/', MessageView.as_view(), name='message-list'),
    path('messages/get/', views.get_messages, name='get-messages'),
    path('messages/post/', post_message, name='post-message'),
    path('messages/update/<int:pk>/', update_message),
    path('messages/delete/<int:pk>/', delete_message),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('user-info/', get_user_info, name='get-user-info'),
    path('register/', RegisterView.as_view(), name='register')
]
