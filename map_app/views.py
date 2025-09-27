from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests

@api_view(['GET'])
def get_city(request, city_name):
    url = f"https://nominatim.openstreetmap.org/search?city={city_name}&format=json"
    response = requests.get(url).json()
    if response:
        lat = response[0]["lat"]
        lon = response[0]["lon"]
        return Response({"city": city_name, "lat": lat, "lon": lon})
    return Response({"error": "City not found"}, status=404)
