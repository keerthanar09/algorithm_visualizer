from . import views
from django.urls import path

urlpatterns = [
    #path('', views.index, name = 'index'),
    path('bubble_sort_vis/', views.bubbleSort, name = 'bubble'),

]