import json
from xxlimited_35 import error

from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from .models import Message
from .serializers import MessageSerializer

class MessageView(generics.ListCreateAPIView):
    queryset = Message.objects.all().order_by('created_at')
    serializer_class = MessageSerializer

def get_messages(request):
    if request.method == 'GET':
        messages = Message.objects.all().values()
        return JsonResponse(list(messages), safe=False)

@csrf_exempt
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