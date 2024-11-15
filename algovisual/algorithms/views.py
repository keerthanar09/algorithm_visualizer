from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import random

# Create your views here.
@api_view(['GET'])
def get_sorting_data(request):
    data = [random.randint(10, 100) for _ in range(10)]
    return Response({"values": data})