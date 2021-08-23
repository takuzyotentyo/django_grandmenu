from django.shortcuts import render

# Create your views here.

def chat( request ):
    return render( request, 'grandmenu_spa/chat/chat.html' )

def index( request ):
    return render( request, 'grandmenu_spa/index.html' )

def login( request ):
    return render( request, 'grandmenu_spa/login.html' )
