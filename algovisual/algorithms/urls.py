from . import views
from .views import *
from django.urls import path

urlpatterns = [
    path('', views.index, name = 'index'),
    path("api/get_sorting_data/", get_sorting_data, name="get_sorting_data"),
    path("api/get_graph_data/", get_graph_data, name = "get_graph_data"),
    path("api/search_algorithms/", search_algorithms, name="search_algorithms"),
]