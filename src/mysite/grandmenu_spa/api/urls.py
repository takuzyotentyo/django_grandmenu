from django.urls import path
from grandmenu_spa.api import views


urlpatterns = [
    path( 'store_information/', views.StoreInformation.as_view(), name='store_information'),
]