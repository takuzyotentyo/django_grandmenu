from django.urls import path

from . import views

urlpatterns = [
    path( 'c', views.chat, name='chat' ),
    path( '', views.index, name='index' ),
]