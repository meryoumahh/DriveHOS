from django.urls import path
from .views import TripPlanRequestView

urlpatterns = [
    path("trip-plan/", TripPlanRequestView.as_view(), name="trip-plan"),
]
    