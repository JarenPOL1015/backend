from django.shortcuts import render

# Importe requests y json
import requests
import json

# Create your views here.
from django.http import HttpResponse

# Importe el decorador login_required
from django.contrib.auth.decorators import login_required, permission_required

from api.views import LandingAPI
from rest_framework.request import Request

# Restricción de acceso con @login_required y permisos con @permission_required
@login_required
@permission_required('main.index_viewer', raise_exception=True)
def index(request):
    
    # Crear un objeto Request de DRF basado en el request original
    drf_request = Request(request)

    # Llamar directamente al método GET de LandingAPI
    response = LandingAPI().get(drf_request)

    # Extraer los datos JSON directamente
    response_dict = response.data

    # Respuestas totales
    total_responses = len(response_dict.keys()) if response_dict else 0

    # Manejo de fechas
    responses = list(response_dict.values()) if response_dict else []

    # Manejo de fechas
    if responses:  # Verificar que hay respuestas
        # Ordenar por la fecha 'saved'
        responses.sort(key=lambda x: x.get('saved'))
        first_response_date = responses[0].get('saved', 'N/A')  # Fecha de la primera respuesta
        last_response_date = responses[-1].get('saved', 'N/A')  # Fecha de la última respuesta
    else:
        first_response_date = 'N/A'
        last_response_date = 'N/A'

    # Objeto con los datos a renderizar
    data = {
        'title': 'Landing - Dashboard',
        'total_responses': total_responses,
        'responses': responses,
        'first_response_date': first_response_date,
        'last_response_date': last_response_date,
    }

    # Renderización en la plantilla
    return render(request, 'main/index.html', data)