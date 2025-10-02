from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import TripPlanRequestSerializer
from .HOSConstraints import hos_trip_plan_multileg
from geopy.distance import geodesic
from .routing import get_driving_distance
class TripPlanRequestView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = TripPlanRequestSerializer(data=request.data)
        
        if serializer.is_valid():
            # Access user data from serializer.validated_data
            current_location = serializer.validated_data.get("current_location")
            pickup_location = serializer.validated_data.get("pickup_location")
            dropoff_location = serializer.validated_data.get("dropoff_location")
            current_cycle_hours = serializer.validated_data.get("current_cycle_hours")
            distance_flat_miles = geodesic(current_location, pickup_location).miles
            # Get driving distance using helper
            distance_miles1 = get_driving_distance(current_location, pickup_location)
            distance_miles2 = get_driving_distance(pickup_location, dropoff_location)
            print("from ", current_location, " to ", pickup_location, " distance is ", distance_miles1)
            print("from ", current_location, " to ", pickup_location, " the flat distance is ", distance_flat_miles)
            print(current_location, pickup_location, dropoff_location, current_cycle_hours, distance_flat_miles, distance_miles1)
            result = hos_trip_plan_multileg(distance_miles1, distance_miles2,  current_cycle_hours , avg_speed_mph=50.0)
            return Response({"message": "Trip plan calculated", "data": result})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
