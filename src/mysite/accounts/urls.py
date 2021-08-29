#適宜プロジェクトごとに追加するファイル
from django.conf.urls import url
from django.contrib.auth import views as auth_views
from . import views
from django.urls import path, include

app_name = 'accounts'

urlpatterns = [
    path('', views.Login.as_view(), name='login'),
    path('login/', views.Login.as_view(), name='login'),
    path('logout/', views.Logout.as_view(), name='logout'),
    path('registration/', views.Registration.as_view(), name='registration'),
    path('registration/temporary', views.TemporaryRegistration.as_view(), name='temporary_registration'),
    path('registration/complete/<token>/', views.RegistrationComplete.as_view(), name='complete_registration'),
]