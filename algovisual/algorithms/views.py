from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import random, math
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Algorithms1

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
        #Keeping the number of inputes within the range of 2 to 50 only as its reasonable.
        if num_elements < 2 or num_elements > 50:
            return Response(
                {"error": "num_elements must be between 2 and 50"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        
        data = [random.randint(10, 300) for _ in range(num_elements)]
        return Response(data, status=status.HTTP_200_OK)

    except ValueError:
        return Response(
            {"error": "Invalid 'num_elements' parameter. Must be an integer."},
            status=status.HTTP_400_BAD_REQUEST,
        )

@api_view(['GET'])
def get_graph_data(request, format = None):
    try: 
        max_weight = int(request.query_params.get('max_weight', 20))

        node_count = int(request.query_params.get('node_count', 6))
        nodes = []
        edges = []
        graph = [[IndentationError('inf')] * node_count for _ in range(node_count)]
        # center_x, center_y, radius = 300, 300, 150
        if node_count < 3 or node_count > 15:
            return Response(
                {
                    "error":"Node count must be within the range of 3 and 15"
                },
                status = status.HTTP_400_BAD_REQUEST,
            )
        nodes = [{'id': i, 'x': random.randint(50, 350), 'y': random.randint(50, 350)} for i in range(node_count)]
        edges = []
        graph = [[float('inf')] * node_count for _ in range(node_count)]

        for i in range(node_count):
            graph[i][i] = 0
            for j in range(i + 1, node_count):
                if random.random() > 0.5:  # Randomly decide whether to create an edge
                    weight = random.randint(1, max_weight)
                    edges.append({'from': i, 'to': j, 'weight': weight})
                    graph[i][j] = graph[j][i] = weight
        for i in range(len(graph)):
            for j in range(len(graph[i])):
                if graph[i][j] == float('inf'):
                    graph[i][j] = 99999
        return JsonResponse({'nodes': nodes, 'edges': edges, 'graph': graph})
    except ValueError:
        return JsonResponse({'error': 'Invalid parameters'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
@csrf_exempt
def search_algorithms(request):
    if request.method == "GET":
        query = request.GET.get("query", "")
        if query:
            results = Algorithms1.objects.filter(name__icontains=query).values("slno", "name", "path")
            return JsonResponse(list(results), safe=False)
        return JsonResponse([], safe=False)