from django.urls import path, include

from . import views

app_name = 'grandmenu_spa'

urlpatterns = [
    path( 'c', views.chat, name='chat'),
    path('', views.Home.as_view(), name='index'),
    path('api/', include('grandmenu_spa.api.urls')),
]