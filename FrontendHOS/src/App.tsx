import './App.css'
import { Truck, Shield, Clock, CheckCircle } from 'lucide-react';
/*import TripPlanningForm from './components/TripPlanningForm';
import Map from './components/Map'; 
function App() {


  return (
    <div className='flex flex-col gap-5 w-full bg-gray-50'>
      
      <header className='flex justify-between p-5 shadow-xs  mx-20'>
            <div className='flex gap-2 justify-center align-middle items-center '>
                <div className="bg-blue-500 p-3 rounded-xl">
                  <Truck size={50} className="text-white" />
                </div>
                <div>
                  <h1 className='text-3xl font-bold text-gray-700'>TruckRoute Pro</h1>
                  <h2 className='text-xl font-meduim text-gray-500'>FMCSA HOS Compliant Trip Planning</h2>
                </div>
            </div>
            <div className='flex gap-2 justify-center align-middle items-center'>
              <div className='flex justify-center items-center gap-1 border-1 border-gray-400 rounded-3xl px-1'>
                <Shield className="h-4 w-4" />
                FMCSA Certified
              </div>
              <div className='flex justify-center items-center gap-1 border-1 border-gray-400 rounded-3xl px-1'>
                <CheckCircle className="h-4 w-4" />
                ELD Compatible
              </div>
            </div>
      </header>
      <main>
        <div className='flex gap-2 items-center justify-around mx-20 my-10'>
          <div className='flex flex-col justify-center items-center text-center gap-1  bg-white rounded-2xl p-3 shadow-md '>
            <div className="bg-green-500 p-3 rounded-xl">
              <Clock className="h-6 w-6 text-white"/>
            </div>
            <h1 className='text-xl font-bold text-gray-700'>HOS Compliance</h1>
            <p className='font-meduim text-gray-500'>Automatic calculation of driving limits, breaks, and rest periods</p>
          </div>
          <div className='flex flex-col justify-center items-center text-center gap-1  bg-white  rounded-2xl p-3 shadow-md '>
            <div className="bg-blue-500 p-3 rounded-xl">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <h1 className='text-xl font-bold text-gray-700'>Smart Routing</h1>
            <p className='font-meduim text-gray-500'>Optimized routes with fuel stops and compliant rest areas</p>
          </div>
          <div className='flex flex-col justify-center items-center text-center gap-1  bg-white  rounded-2xl p-3 shadow-md '>
            <div className="bg-orange-500 p-3 rounded-xl">
              <CheckCircle className="h-6 w-6 text-white"/>
            </div>
            <h1 className='text-xl font-bold text-gray-700'>ELD Ready</h1>
            <p className='font-meduim text-gray-500'>Generate compliant daily log sheets for your records</p>
          </div>
        </div>
        <div className='flex gap-3 justify-between align-top mx-20'>
        <TripPlanningForm/>
        
        <Map/>
        </div>
        
        
      </main>
    
    </div>
  )
}

export default App
*/
import React, { useState } from "react";
import TripPlanningForm from "./components/TripPlanningForm";
import Map from "./components/Map";
import TripResults from "./components/TripResults";

export type Position = {
  address: string;
  lat: number | null;
  lng: number | null;
};

export type Positions = {
  currentLocation: Position;
  pickupLocation: Position;
  dropoffLocation: Position;
};

const defaultPositions: Positions = {
  currentLocation: { address: "", lat: null, lng: null },
  pickupLocation: { address: "", lat: null, lng: null },
  dropoffLocation: { address: "", lat: null, lng: null },
};

const App: React.FC = () => {
  const [positions, setPositions] = useState<Positions>(defaultPositions);
  const [tripData, setTripData] = useState<any>(null);

  async function handleAddressSearch(field: keyof Positions, address: string) {
    if (!address) return;
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
    );
    const data = await response.json();
    if (data.length > 0) {
      const place = data[0];
      setPositions(prev => ({
        ...prev,
        [field]: {
          address: place.display_name,
          lat: parseFloat(place.lat),
          lng: parseFloat(place.lon),
        },
      }));
    }
  }

  const handleTripResult = (data: any) => {
    setTripData(data);
  };

  return (
    <div className="flex flex-col gap-5 w-full bg-gray-50">
      <header className='flex justify-between p-5 shadow-xs  mx-20'>
            <div className='flex gap-2 justify-center align-middle items-center '>
                <div className="bg-blue-500 p-3 rounded-xl">
                  <Truck size={50} className="text-white" />
                </div>
                <div>
                  <h1 className='text-3xl font-bold text-gray-700'>TruckRoute Pro</h1>
                  <h2 className='text-xl font-meduim text-gray-500'>FMCSA HOS Compliant Trip Planning</h2>
                </div>
            </div>
            <div className='flex gap-2 justify-center align-middle items-center'>
              <div className='flex justify-center items-center gap-1 border-1 border-gray-400 rounded-3xl px-1'>
                <Shield className="h-4 w-4" />
                FMCSA Certified
              </div>
              <div className='flex justify-center items-center gap-1 border-1 border-gray-400 rounded-3xl px-1'>
                <CheckCircle className="h-4 w-4" />
                ELD Compatible
              </div>
            </div>
      </header>
      <main>
        <main>
        <div className='flex gap-2 items-center justify-around mx-20 my-10'>
          <div className='flex flex-col justify-center items-center text-center gap-1  bg-white rounded-2xl p-3 shadow-md '>
            <div className="bg-green-500 p-3 rounded-xl">
              <Clock className="h-6 w-6 text-white"/>
            </div>
            <h1 className='text-xl font-bold text-gray-700'>HOS Compliance</h1>
            <p className='font-meduim text-gray-500'>Automatic calculation of driving limits, breaks, and rest periods</p>
          </div>
          <div className='flex flex-col justify-center items-center text-center gap-1  bg-white  rounded-2xl p-3 shadow-md '>
            <div className="bg-blue-500 p-3 rounded-xl">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <h1 className='text-xl font-bold text-gray-700'>Smart Routing</h1>
            <p className='font-meduim text-gray-500'>Optimized routes with fuel stops and compliant rest areas</p>
          </div>
          <div className='flex flex-col justify-center items-center text-center gap-1  bg-white  rounded-2xl p-3 shadow-md '>
            <div className="bg-orange-500 p-3 rounded-xl">
              <CheckCircle className="h-6 w-6 text-white"/>
            </div>
            <h1 className='text-xl font-bold text-gray-700'>ELD Ready</h1>
            <p className='font-meduim text-gray-500'>Generate compliant daily log sheets for your records</p>
          </div>
        </div>
        <div className='flex gap-3 justify-between align-top mx-20'>
        <TripPlanningForm
            positions={positions}
            setPositions={setPositions}
            onAddressSearch={handleAddressSearch}
            onTripResult={handleTripResult}
          />
          <Map positions={positions} />
        </div>
        
        {tripData && <TripResults tripData={tripData} />}
        
      </main>
      </main>
    </div>
  );
};

export default App;
