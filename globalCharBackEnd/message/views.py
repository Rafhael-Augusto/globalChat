import json

from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Message
from .serializers import MessageSerializer, RegisterSerializer


class MessageView(generics.ListCreateAPIView):
    queryset = Message.objects.all().order_by('created_at')
    serializer_class = MessageSerializer

def get_messages(request):
    if request.method == 'GET':
        messages = Message.objects.all().order_by('created_at')
        serializer = MessageSerializer(messages, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
@permission_classes([IsAuthenticated])
def post_message(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        message_text = data.get('text')
        message_owner_id = data.get('owner_id')
        attachment = data.get('attachment')
        avatar = data.get('avatar')

        message = Message.objects.create(
            text = message_text,
            owner = User.objects.get(id=message_owner_id),
            attachment = attachment,
            avatar = avatar
        )
        return JsonResponse({'id:': message.id})
    return JsonResponse({'error': 'Metodo nao foi permitido'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user

    return Response({
        'username': user.username,
        'id': user.id
    })

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response('Usuario criado')
        return Response(serializer.errors)