import json

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

@api_view(['GET'])
def get_messages(request):
    messages = Message.objects.all().order_by('created_at')
    serializer = MessageSerializer(messages, many=True)
    return JsonResponse(serializer.data, safe=False)

@csrf_exempt
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def post_message(request):
    serializer = MessageSerializer(data=request.data, context={'request': request})

    if serializer.is_valid():
        serializer.save()
        return Response({'salvo'})
    return Response(serializer.errors)

@csrf_exempt
def update_message(request, pk):
    try:
        message = Message.objects.get(pk=pk)

    except Message.DoesNotExist:
        return JsonResponse(list({'erro mensagem nao encontrada'}), safe=False)

    if request.method == 'PUT':
        data = json.loads(request.body)
        message.text = data.get('text', message.text)
        message.save()

        return JsonResponse(list({'Mensagem atualizada'}), safe=False)

@csrf_exempt
def delete_message(request, pk):
    try:
        message = Message.objects.get(pk=pk)
    except Message.DoesNotExist:
        return JsonResponse({'erro' :'mensagem nao encontrada'}, safe=False)

    if request.method == 'DELETE':
        message.delete()
        return JsonResponse({'deu bom': 'mensagem deletada'}, safe=False)
    return JsonResponse({'erro': 'Erro fetch front end'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    user = request.user

    return Response({
        'username': user.username,
        'id': user.id,
    })

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response('Usuario criado')
        return Response(serializer.errors)