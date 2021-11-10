from django.db.models import fields
from rest_framework import serializers
from accounts.models import Store

class StoreSerealizer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'
        # fields = ['email']        # こんな感じでemailのみを返すことが出来る
        # exclude = ['email']       # こんな感じでemail以外を返すことが出来る

