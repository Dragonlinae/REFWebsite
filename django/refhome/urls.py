from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('camps/', views.camps, name='camps'),
    path('support/', views.support, name='support'),
    path('volunteer/', views.volunteer, name='volunteer'),
    path('workshops/', views.workshops, name='workshops'),
]
