from django.urls import path
from .views import get_city

urlpatterns = [
    path('city/<str:city_name>/', get_city),
]
