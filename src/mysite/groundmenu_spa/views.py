from django.shortcuts import render

# Create your views here.

def chat( request ):
    return render( request, 'chat/chat.html' )

def index( request ):
    return render( request, 'index.html' )