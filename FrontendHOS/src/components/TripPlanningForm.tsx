
/*import { useState } from "react";
import { MapPin, Truck, Flag, Clock, Calculator } from "lucide-react";
import {  Route  } from 'lucide-react';
const TripPlanningForm = () => {
  const [formData, setFormData] = useState({
    currentLocation: "",
    pickupLocation: "",
    dropoffLocation: "",
    currentCycleHours: 0,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      {/* Header */
      /*<div className="flex items-center gap-3 mb-6">
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

      {/* Form */
      /*<form className="space-y-6">
        {/* Current Location */
        /*<div className="space-y-2">
          <label
            htmlFor="currentLocation"
            className="flex items-center gap-2 font-medium"
          >
            <MapPin className="h-4 w-4 text-blue-600" />
            Current Location
          </label>
          <input
            id="currentLocation"
            placeholder="Enter your current location (city, state or address)"
            value={formData.currentLocation}
            onChange={(e) => handleInputChange("currentLocation", e.target.value)}
            className="w-full h-12 px-3 border rounded-md"
            required
          />
        </div>

        <hr />

        {/* Pickup + Dropoff */
        /*<div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="pickupLocation"
              className="flex items-center gap-2 font-medium"
            >
              <Truck className="h-4 w-4 text-green-600" />
              Pickup Location
            </label>
            <input
              id="pickupLocation"
              placeholder="Cargo pickup address"
              value={formData.pickupLocation}
              onChange={(e) =>
                handleInputChange("pickupLocation", e.target.value)
              }
              className="w-full h-12 px-3 border rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="dropoffLocation"
              className="flex items-center gap-2 font-medium"
            >
              <Flag className="h-4 w-4 text-red-600" />
              Drop-off Location
            </label>
            <input
              id="dropoffLocation"
              placeholder="Cargo delivery address"
              value={formData.dropoffLocation}
              onChange={(e) =>
                handleInputChange("dropoffLocation", e.target.value)
              }
              className="w-full h-12 px-3 border rounded-md"
              required
            />
          </div>
        </div>

        <hr />

        {/* Hours of Service */
       /* <div className="space-y-4">
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
                value={formData.currentCycleHours || ""}
                onChange={(e) =>
                  handleInputChange(
                    "currentCycleHours",
                    parseFloat(e.target.value) || 0
                  )
                }
                className="h-12 w-32 px-3 border rounded-md"
                required
              />
              <span className="text-sm text-gray-600">out of 70 hours</span>

              {formData.currentCycleHours > 60 &&
                formData.currentCycleHours < 70 && (
                  <div className="text-yellow-600 font-medium">
                    Approaching Limit
                  </div>
                )}

              {formData.currentCycleHours >= 70 && (
                <div className="text-red-600 font-medium">
                  34-Hour Reset Required
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">
              Enter hours already used in your current 8-day cycle
            </p>
          </div>
        </div>

        <hr />

        {/* Submit Button (just UI, no action) */
        /*<button
          type="button"
          className="w-full h-14 bg-blue-600 text-white text-lg font-medium rounded-md hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <Calculator className="h-5 w-5" />
          Plan Compliant Trip
        </button>
      </form>

      {/* HOS Quick Reference */
      /*<div className="mt-6 p-4 bg-gray-100 rounded-lg">
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

import React from "react";
import type { Positions } from "../App";

type TripPlanningFormProps = {
  positions: Positions;
  setPositions: React.Dispatch<React.SetStateAction<Positions>>;
  onAddressSearch: (field: keyof Positions, address: string) => void;
};

const TripPlanningForm: React.FC<TripPlanningFormProps> = ({
  positions,
  setPositions,
  onAddressSearch,
}) => (
  <form className="space-y-6">
    {(["currentLocation", "pickupLocation", "dropoffLocation"] as Array<keyof Positions>).map(field => (
      <div key={field} className="space-y-2">
        <label className="font-medium capitalize">
          {field.replace("Location", " Location")}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={positions[field].address}
            placeholder={`Enter ${field.replace("Location", " location")} address`}
            onChange={e =>
              setPositions(prev => ({
                ...prev,
                [field]: { ...prev[field], address: e.target.value }
              }))
            }
            className="border px-2 py-1 rounded-md"
          />
          <button
            type="button"
            onClick={() => onAddressSearch(field, positions[field].address)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Search on Map
          </button>
        </div>
        <div className="text-xs text-gray-500">
          Lat: {positions[field].lat ?? "N/A"}, Lng: {positions[field].lng ?? "N/A"}
        </div>
      </div>
    ))}
    <button
      type="submit"
      className="bg-green-600 text-white px-4 py-2 rounded"
    >
      Submit
    </button>
  </form>
);

export default TripPlanningForm;


import React from "react";
import type { Positions } from "../App";
import { MapPin, Truck, Flag, Calculator } from "lucide-react";

type TripPlanningFormProps = {
  positions: Positions;
  setPositions: React.Dispatch<React.SetStateAction<Positions>>;
  onAddressSearch: (field: keyof Positions, address: string) => void;
};

const TripPlanningForm: React.FC<TripPlanningFormProps> = ({
  positions,
  setPositions,
  onAddressSearch,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      {/* Header 
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-blue-600">
          <Calculator className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Trip Planner</h2>
          <p className="text-gray-500 text-sm">
            Plan your route and search locations on the map
          </p>
        </div>
      </div>

      {/* Form 
      <form className="space-y-6">
        {/* Current Location 
        <div className="space-y-2">
          <label
            htmlFor="currentLocation"
            className="flex items-center gap-2 font-medium"
          >
            <MapPin className="h-4 w-4 text-blue-600" />
            Current Location
          </label>
          <div className="flex gap-2">
            <input
              id="currentLocation"
              placeholder="Enter your current location (city, state or address)"
              value={positions.currentLocation.address}
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
              className="bg-blue-500 text-white px-4 rounded hover:opacity-90"
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

        {/* Pickup + Dropoff 
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="pickupLocation"
              className="flex items-center gap-2 font-medium"
            >
              <Truck className="h-4 w-4 text-green-600" />
              Pickup Location
            </label>
            <div className="flex gap-2">
              <input
                id="pickupLocation"
                placeholder="Cargo pickup address"
                value={positions.pickupLocation.address}
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
                className="bg-green-500 text-white px-4 rounded hover:opacity-90"
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
            <label
              htmlFor="dropoffLocation"
              className="flex items-center gap-2 font-medium"
            >
              <Flag className="h-4 w-4 text-red-600" />
              Drop-off Location
            </label>
            <div className="flex gap-2">
              <input
                id="dropoffLocation"
                placeholder="Cargo delivery address"
                value={positions.dropoffLocation.address}
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
                className="bg-red-500 text-white px-4 rounded hover:opacity-90"
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

        {/* Submit Button 
        <button
          type="submit"
          className="w-full h-14 bg-blue-600 text-white text-lg font-medium rounded-md hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <Calculator className="h-5 w-5" />
          Submit Trip Plan
        </button>
      </form>
    </div>
  );
};

export default TripPlanningForm;


*/ 
import React, { useState } from "react";
import type { Positions } from "../App";
import { MapPin, Truck, Flag, Clock, Calculator, Route } from "lucide-react";
import { getTripPlan } from "../utils/tripservice";
type TripPlanningFormProps = {
  positions: Positions;
  setPositions: React.Dispatch<React.SetStateAction<Positions>>;
  onAddressSearch: (field: keyof Positions, address: string) => void;
  //currentCycle : number;
};

const TripPlanningForm: React.FC<TripPlanningFormProps> = ({
  positions,
  setPositions,
  onAddressSearch,
}) => {
  const [currentCycleHours, setCurrentCycleHours] = useState<number >(0);
  const [loading, setLoading] = useState(false);
  const [tripResult, setTripResult] = useState<any>(null);
  // 📌 submit handler
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
        current_cycle_hours: currentCycleHours,
      };

      console.log("Sending payload:", payload);
      const response = await getTripPlan(payload); // call API service
      setTripResult(response.data); // save result to state
      console.log("Trip plan received:", response.data);
      alert(response.data)
    } catch (error) {
      console.error("Error fetching trip plan:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mb-5">
      {/* Header */}
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

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Current Location */}
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

        {/* Pickup + Dropoff */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Pickup */}
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

          {/* Dropoff */}
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

        {/* Hours of Service */}
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
                value={currentCycleHours}
                onChange={(e) => {
                  const value = e.target.value;
                  setCurrentCycleHours(parseFloat(value));
                }}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-14 bg-green-600 text-white text-lg font-medium rounded-md hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <Calculator className="h-5 w-5" />
          Plan Compliant Trip
        </button>
      </form>

      {/* HOS Quick Reference */}
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
