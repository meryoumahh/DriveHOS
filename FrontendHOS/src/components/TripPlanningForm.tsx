import React, { useState } from "react";
import type { Positions } from "../App";
import { MapPin, Truck, Flag, Clock, Calculator, Route } from "lucide-react";
import { getTripPlan } from "../utils/tripservice";

type TripPlanningFormProps = {
  positions: Positions;
  setPositions: React.Dispatch<React.SetStateAction<Positions>>;
  onAddressSearch: (field: keyof Positions, address: string) => void;
  onTripResult: (data: any) => void;
};

const TripPlanningForm: React.FC<TripPlanningFormProps> = ({
  positions,
  setPositions,
  onAddressSearch,
  onTripResult,
}) => {
  const [currentCycleHours, setCurrentCycleHours] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        current_location: [
          positions.currentLocation.lat,
          positions.currentLocation.lng,
        ],
        pickup_location: [
          positions.pickupLocation.lat,
          positions.pickupLocation.lng,
        ],
        dropoff_location: [
          positions.dropoffLocation.lat,
          positions.dropoffLocation.lng,
        ],
        current_cycle_hours: currentCycleHours || 0,
      };

      const response = await getTripPlan(payload);
      onTripResult(response);
    } catch (error: any) {
      console.error("Error fetching trip plan:", error);
      let errorMessage = "Failed to get trip plan. ";
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage += "Backend server is not running. Please check if your Django server is running on http://localhost:8000";
      } else if (error.response) {
        errorMessage += `Server error: ${error.response.status} ${error.response.statusText}`;
      } else {
        errorMessage += "Please try again.";
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mb-5">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-blue-600">
          <Route className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Trip Planner</h2>
          <p className="text-gray-500 text-sm">
            Plan your route with FMCSA HOS compliance
          </p>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {loading && (
          <div className="text-center text-blue-600 font-medium">
            Planning your trip... This may take a moment.
          </div>
        )}
        <div className="space-y-2">
          <label className="flex items-center gap-2 font-medium">
            <MapPin className="h-4 w-4 text-blue-600" />
            Current Location
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={positions.currentLocation.address}
              placeholder="Enter your current location (city, state or address)"
              onChange={(e) =>
                setPositions((prev) => ({
                  ...prev,
                  currentLocation: {
                    ...prev.currentLocation,
                    address: e.target.value,
                  },
                }))
              }
              className="w-full h-12 px-3 border rounded-md"
              required
            />
            <button
              type="button"
              onClick={() =>
                onAddressSearch("currentLocation", positions.currentLocation.address)
              }
              className="bg-blue-500 text-white px-3 rounded-xl"
            >
              Search
            </button>
          </div>
          <div className="text-xs text-gray-500">
            Lat: {positions.currentLocation.lat ?? "N/A"}, Lng:{" "}
            {positions.currentLocation.lng ?? "N/A"}
          </div>
        </div>

        <hr />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="flex items-center gap-2 font-medium">
              <Truck className="h-4 w-4 text-green-600" />
              Pickup Location
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={positions.pickupLocation.address}
                placeholder="Cargo pickup address"
                onChange={(e) =>
                  setPositions((prev) => ({
                    ...prev,
                    pickupLocation: {
                      ...prev.pickupLocation,
                      address: e.target.value,
                    },
                  }))
                }
                className="w-full h-12 px-3 border rounded-md"
                required
              />
              <button
                type="button"
                onClick={() =>
                  onAddressSearch("pickupLocation", positions.pickupLocation.address)
                }
                className="bg-green-500 text-white px-3 rounded-xl"
              >
                Search
              </button>
            </div>
            <div className="text-xs text-gray-500">
              Lat: {positions.pickupLocation.lat ?? "N/A"}, Lng:{" "}
              {positions.pickupLocation.lng ?? "N/A"}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 font-medium">
              <Flag className="h-4 w-4 text-red-600" />
              Drop-off Location
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={positions.dropoffLocation.address}
                placeholder="Cargo delivery address"
                onChange={(e) =>
                  setPositions((prev) => ({
                    ...prev,
                    dropoffLocation: {
                      ...prev.dropoffLocation,
                      address: e.target.value,
                    },
                  }))
                }
                className="w-full h-12 px-3 border rounded-md"
                required
              />
              <button
                type="button"
                onClick={() =>
                  onAddressSearch("dropoffLocation", positions.dropoffLocation.address)
                }
                className="bg-orange-500 text-white px-3 rounded-xl"
              >
                Search
              </button>
            </div>
            <div className="text-xs text-gray-500">
              Lat: {positions.dropoffLocation.lat ?? "N/A"}, Lng:{" "}
              {positions.dropoffLocation.lng ?? "N/A"}
            </div>
          </div>
        </div>

        <hr />

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium">Hours of Service Status</h3>
          </div>

          <div className="space-y-2">
            <label htmlFor="currentCycleHours" className="text-sm font-medium">
              Current 70-Hour Cycle Used
            </label>
            <div className="flex items-center gap-4">
              <input
                id="currentCycleHours"
                type="number"
                min="0"
                max="70"
                step="0.5"
                placeholder="0"
                value={currentCycleHours || ''}
                onChange={(e) => setCurrentCycleHours(parseFloat(e.target.value) || 0)}
                className="h-12 w-32 px-3 border rounded-md"
                required
              />
              <span className="text-sm text-gray-600">out of 70 hours</span>
              {currentCycleHours > 60 && currentCycleHours < 70 && (
                <div className="text-yellow-600 font-medium">Approaching Limit</div>
              )}
              {currentCycleHours >= 70 && (
                <div className="text-red-600 font-medium">34-Hour Reset Required</div>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Enter hours already used in your current 8-day cycle
            </p>
          </div>
        </div>

        <hr />

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-green-600 text-white text-lg font-medium rounded-md hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Calculator className="h-5 w-5" />
          {loading ? "Planning..." : "Plan Compliant Trip"}
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h4 className="font-medium text-sm mb-2 text-gray-800">
          HOS Quick Reference
        </h4>
        <div className="grid gap-1 text-xs text-gray-600">
          <div>• Max 11 hours driving per day</div>
          <div>• Max 14-hour duty window per day</div>
          <div>• 30-min break after 8 hours driving</div>
          <div>• 10 consecutive hours off-duty required</div>
          <div>• 70 hours max in 8-day cycle</div>
        </div>
      </div>
    </div>
  );
};

export default TripPlanningForm;