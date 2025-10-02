from typing import Dict, List

# -------------------- HOS CONSTANTS --------------------
MAX_DAILY_DRIVE = 11       # max driving hours per day
MAX_DAILY_ONDUTY = 14      # max on-duty hours per day
MAX_CYCLE_HOURS = 70       # 70h in 8 days
MIN_REST = 10              # daily rest
BREAK_AFTER = 8            # break after 8 driving hrs
BREAK_TIME = 0.5           # 30min
LONG_BREAK = 34            # reset after cycle
LOAD_TIME = 1              # 1h load
UNLOAD_TIME = 1            # 1h unload
FUEL_TIME = 1              # 1h fueling every 1000 miles

def simulate_hos_trip(legs: List[Dict], start_cycle_hours: float = 0.0, avg_speed_mph: float = 50.0) -> List[Dict]:
    days = []
    cycle_hours = start_cycle_hours
    hours_driven_today = 0.0
    onduty_today = 0.0
    miles_since_last_fuel = 0.0
    miles_total = 0.0
    today = {"driving_hours": 0, "onduty_hours": 0, "rest_hours": 0, "breaks": [], "segments": []}

    for leg in legs:
        distance = leg['distance_miles']
        leg_type = leg['type']

        # Handle loading/unloading immediately
        if leg_type in ['load', 'unload']:
            time = LOAD_TIME if leg_type == 'load' else UNLOAD_TIME
            onduty_today += time
            cycle_hours += time
            today['segments'].append({"type": "loading" if leg_type == 'load' else "unloading", "length": time})
            continue

        remaining_hours = distance / avg_speed_mph
        while remaining_hours > 0:
            # Cycle reset
            if cycle_hours >= MAX_CYCLE_HOURS:
                if today['segments']:
                    today['driving_hours'] = hours_driven_today
                    today['onduty_hours'] = onduty_today
                    days.append(today)
                days.append({
                    "driving_hours": 0,
                    "onduty_hours": 0,
                    "rest_hours": LONG_BREAK,
                    "breaks": [{"type": "cycle_reset", "length": LONG_BREAK}],
                    "segments": [{"type": "cycle_reset", "length": LONG_BREAK}]
                })
                cycle_hours = 0
                hours_driven_today = 0
                onduty_today = 0
                today = {"driving_hours": 0, "onduty_hours": 0, "rest_hours": 0, "breaks": [], "segments": []}

            # Determine next drive chunk
            drive_time = min(
                1.0,
                remaining_hours,
                MAX_DAILY_DRIVE - hours_driven_today,
                MAX_DAILY_ONDUTY - onduty_today
            )

            # Break after 8 hours driving, insert only if NOT taken yet for today and NOT at day end
            if hours_driven_today >= BREAK_AFTER and not any(b['type'] == 'break' for b in today['breaks']) and drive_time > 0:
                onduty_today += BREAK_TIME
                cycle_hours += BREAK_TIME
                today['segments'].append({"type": "break", "length": BREAK_TIME})
                today['breaks'].append({"type": "break", "length": BREAK_TIME})

            # Fueling every 1000 miles
            if int(miles_since_last_fuel // 1000) < int((miles_since_last_fuel + drive_time * avg_speed_mph) // 1000):
                onduty_today += FUEL_TIME
                cycle_hours += FUEL_TIME
                today['segments'].append({"type": "fuel", "length": FUEL_TIME})
                miles_since_last_fuel = 0
            else:
                miles_since_last_fuel += drive_time * avg_speed_mph

            # Drive
            hours_driven_today += drive_time
            onduty_today += drive_time
            cycle_hours += drive_time
            remaining_hours -= drive_time
            miles_total += drive_time * avg_speed_mph
            today['segments'].append({"type": "drive", "length": drive_time})

            # End of day or max hours reached: 10h off required!
            if hours_driven_today >= MAX_DAILY_DRIVE or onduty_today >= MAX_DAILY_ONDUTY:
                today['rest_hours'] = MIN_REST
                today['segments'].append({"type": "rest", "length": MIN_REST})
                today['breaks'].append({"type": "rest", "length": MIN_REST})
                today['driving_hours'] = hours_driven_today
                today['onduty_hours'] = onduty_today
                days.append(today)
                hours_driven_today = 0
                onduty_today = 0
                today = {"driving_hours": 0, "onduty_hours": 0, "rest_hours": 0, "breaks": [], "segments": []}

    # Final partial day
    if today['segments']:
        today['driving_hours'] = hours_driven_today
        today['onduty_hours'] = onduty_today
        days.append(today)

    return days

def hos_trip_plan_multileg(distance_to_pickup: float, distance_to_dropoff: float, start_cycle_hours: float = 0.0 ,avg_speed_mph: float = 50.0 ) -> Dict:
    legs = [
        {"distance_miles": distance_to_pickup, "type": "drive"},
        {"distance_miles": 0, "type": "load"},
        {"distance_miles": distance_to_dropoff, "type": "drive"},
        {"distance_miles": 0, "type": "unload"}
    ]
    schedule = simulate_hos_trip(legs, start_cycle_hours=start_cycle_hours, avg_speed_mph=avg_speed_mph)
    total_duration = distance_to_pickup / avg_speed_mph + distance_to_dropoff / avg_speed_mph + LOAD_TIME + UNLOAD_TIME

    return {
        "message": "Trip plan calculated",
        "data": {
            "input": {
                "distance_to_pickup_miles": distance_to_pickup,
                "distance_to_dropoff_miles": distance_to_dropoff,
                "duration_to_pickup": distance_to_pickup / avg_speed_mph,
                "duration_to_dropoff": distance_to_dropoff / avg_speed_mph,
                "total_duration": total_duration,
                "avg_speed_mph": avg_speed_mph,
                "start_cycle_hours": start_cycle_hours
            },
            "hos_log_by_day": schedule
        }
    }

# -------------------- USAGE EXAMPLE --------------------
if __name__ == "__main__":
    plan = hos_trip_plan_multileg(334, 332, avg_speed_mph=70, start_cycle_hours=20)
    import json
    print(json.dumps(plan, indent=4))
