'use client'

import { useState } from 'react';
import { getAirportRecommendations } from './actions';
import { AirportInfo, FlightState } from '../types/aviation';
import { AirportRecommendation } from './components/AirportRecommendation';

export default function Home() {
  const [recommendations, setRecommendations] = useState<AirportInfo[]>([]);

  const fetchRecommendations = async () => {
    const flightState: FlightState = {
      currentPosition: { latitude: 40.7128, longitude: -74.0060 }, // New York City coordinates
      remainingFuel: 20000, // in kg
      airplaneModel: {
        type: 'Boeing 777',
        fuelCapacity: 171170, // in kg
        range: 14685, // in km
      },
    };

    const airports = await getAirportRecommendations(flightState);
    setRecommendations(airports);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pilot Assistant</h1>
      <button
        onClick={fetchRecommendations}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
      >
        Fetch Airport Recommendations
      </button>
      {recommendations.map((airport) => (
        <AirportRecommendation key={airport.icao} airport={airport as AirportInfo & { distance: number }} />
      ))}
    </div>
  );
}

