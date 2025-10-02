from rest_framework import serializers

class TripPlanRequestSerializer(serializers.Serializer):
    current_location = serializers.ListField(
        child=serializers.FloatField(),
        min_length=2,
        max_length=2,
        help_text="Current location as [latitude, longitude]"
    )
    pickup_location = serializers.ListField(
        child=serializers.FloatField(),
        min_length=2,
        max_length=2,
        help_text="Pickup location as [latitude, longitude]"
    )
    dropoff_location = serializers.ListField(
        child=serializers.FloatField(),
        min_length=2,
        max_length=2,
        help_text="Dropoff location as [latitude, longitude]"
    )
    current_cycle_hours = serializers.FloatField(
        help_text="Number of driving hours already completed in the cycle"
    )

