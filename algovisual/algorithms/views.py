from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import random

# Create your views here.
def index(request):
    return render(request, 'algorithms/index.html')

@api_view(['GET'])
def get_sorting_data(request, format = None):
    data = [random.randint(10, 100) for _ in range(10)]
    return Response(data, status=status.HTTP_200_OK)