import React from "react";
import {MapPin, CheckCircle } from "lucide-react";

type TripResultsProps = {
  tripData: any;
};

const TripResults: React.FC<TripResultsProps> = ({ tripData }) => {
  if (!tripData) return null;

  // Try multiple possible data paths
  let hosData, segments;
  
  if (tripData.data?.data?.data?.hos_log_by_day?.[0]) {
    hosData = tripData.data.data.data.hos_log_by_day[0];
  } else if (tripData.data?.data?.data?.hos_log_by_day?.[0]) {
    hosData = tripData.data.data.data.hos_log_by_day[0];
  } else if (tripData.data.data.data.hos_log_by_day?.[0]) {
    hosData = tripData.data.data.data.hos_log_by_day[0];
  }
  
  if (!hosData) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <div className="text-center text-gray-500">No trip data available</div>
        <pre className="text-xs mt-2">{JSON.stringify( tripData.data.data.data.hos_log_by_day[0], null, 2)}</pre>
      </div>
    );
  }

  segments = hosData.segments || [];

  const getSegmentIcon = (type: string) => {
    switch (type) {
      case 'drive': return '🚛';
      case 'loading': return '📦';
      case 'unloading': return '📤';
      case 'rest': return '😴';
      default: return '⏱️';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-green-600">
          <CheckCircle className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Trip Plan Results</h2>
          <p className="text-gray-500 text-sm">{tripData.message || 'HOS Compliant Route Plan'}</p>
        </div>
      </div>

      {/* HOS Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-700">{(hosData.driving_hours || 0).toFixed(1)}h</div>
          <div className="text-sm text-blue-600">Driving Hours</div>
        </div>
        <div className="text-center p-4 bg-orange-50 rounded-lg">
          <div className="text-2xl font-bold text-orange-700">{(hosData.onduty_hours || 0).toFixed(1)}h</div>
          <div className="text-sm text-orange-600">On-Duty Hours</div>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-700">{(hosData.rest_hours || 0).toFixed(1)}h</div>
          <div className="text-sm text-purple-600">Rest Hours</div>
        </div>
      </div>

      {/* Trip Segments */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Trip Segments
        </h3>
        
        <div className="space-y-2">
          {segments.map((segment: any, index: number) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl">{getSegmentIcon(segment.type)}</div>
              <div className="flex-1">
                <div className="font-medium capitalize">{segment.type}</div>
                <div className="text-sm text-gray-600">{(segment.length || 0).toFixed(2)} hours</div>
              </div>
              <div className="text-sm text-gray-500">Segment {index + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripResults;