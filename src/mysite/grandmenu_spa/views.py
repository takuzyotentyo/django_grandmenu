from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views import generic
from django.contrib.auth.mixins import LoginRequiredMixin


# Create your views here.

def chat( request ):
    return render( request, 'grandmenu_spa/chat/chat.html' )

class Home(LoginRequiredMixin, generic.TemplateView):
    template_name = 'grandmenu_spa/index.html'
