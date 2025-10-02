# utils/routing.py
import requests
import json
import openrouteservice as ors
# ---------------------
# Configuration
# ---------------------
from decouple import config


client = ors.Client(key=config('ORS_API_KEY'))
#ORS_URL = "https://api.openrouteservice.org/v2/directions/driving-car/json"
#HEADERS = {"Authorization": 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjY0OGE3OGZlYmI1ODQwZTU4MmVlNTg5NTc3NDAwM2ViIiwiaCI6Im11cm11cjY0In0=',
#           "Content-Type": "application/json"
#           }

# ---------------------
# Function to get driving distance
# ---------------------
def get_driving_distance(origin, destination):
    """
    origin, destination: tuples or lists in (lat, lon)
    Returns driving distance in km
    """
    # ORS expects [lon, lat]
    coords = [(origin[1], origin[0]), (destination[1], destination[0])]
    route = client.directions(coordinates=coords, profile='driving-car', format='geojson', validate=False)
    segment = route['features'][0]['properties']['segments'][0]
    distance_miles = segment['distance'] / 1609.34  # convert meters → miles
    duration_hours = segment['duration'] / 3600    # convert seconds → hours

    print(f"Distance: {distance_miles:.2f} miles")
    print(f"Duration: {duration_hours:.2f} hours")
    return route['features'][0]['properties']['segments'][0]['distance'] / 1609.34



#body = {"coordinates": coords}
#try:
#response = requests.post(ORS_URL, json=body, headers=HEADERS)
#response.raise_for_status()  # Raise error if API fails

#data = response.json()
#distance_meters = data["features"][0]["properties"]["segments"][0]["distance"]
#distance_km = distance_meters / 1000
#return distance_km
#except requests.exceptions.HTTPError as e:
#print(f"ORS API Error: {e}")
#return 1 
