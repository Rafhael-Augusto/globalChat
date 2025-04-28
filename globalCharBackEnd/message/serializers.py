from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(source='owner.username', read_only=True)
    owner_id = serializers.PrimaryKeyRelatedField(read_only=True)
    attachment = serializers.FileField(use_url=True, required=False, allow_null=True)

    class Meta:
        model = Message
        fields = ['id', 'text', 'attachment', 'avatar', 'created_at', 'owner_username', 'owner_id']


    def create(self, validated_data):
        return Message.objects.create(owner=self.context['request'].user, **validated_data)

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

