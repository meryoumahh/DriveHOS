// src/api/tripService.ts
import apiClient from "./api";

export const getTripPlan = async (payload: {
  current_location: (number | null)[];
  pickup_location: (number | null)[];
  dropoff_location: (number | null)[];
  current_cycle_hours: number;
}) => {
  return await apiClient.post("/trip/trip-plan/", payload);
};
