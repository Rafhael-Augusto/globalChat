from django.contrib import admin

from message.models import Message

# Register your models here.
@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('owner_id', 'text', 'id', 'attachment')
    search_fields = ('owner_id',)

