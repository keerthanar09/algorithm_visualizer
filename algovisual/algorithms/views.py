from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import random

# Create your views here.
def index(request):
    return render(request, 'algorithms/index.html')

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import random

@api_view(['GET'])
def get_sorting_data(request, format=None):
    try:
        
        num_elements = int(request.query_params.get('num_elements', 10))
        #Keeping the number of inputes within the range of 2 to 100 only as its reasonable.
        if num_elements < 2 or num_elements > 100:
            return Response(
                {"error": "num_elements must be between 2 and 100"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        
        data = [random.randint(10, 300) for _ in range(num_elements)]
        return Response(data, status=status.HTTP_200_OK)

    except ValueError:
        return Response(
            {"error": "Invalid 'num_elements' parameter. Must be an integer."},
            status=status.HTTP_400_BAD_REQUEST,
        )
