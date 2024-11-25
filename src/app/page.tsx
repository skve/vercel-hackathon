"use client";

import { useState, useTransition, useEffect } from "react";
import { getAirportRecommendations } from "./actions";
import { AirportInfo, FlightState } from "./types/aviation";
import { AirportRecommendation } from "./components/AirportRecommendation";
import {
  LightningBoltIcon,
  SewingPinIcon,
  ShadowIcon,
} from "@radix-ui/react-icons";

const INITIAL_FLIGHT_STATE: FlightState = {
  currentPosition: { latitude: 40.7128, longitude: -74.006 }, // New York City coordinates
  remainingFuel: 20000, // in kg
  airplaneModel: {
    type: "Boeing 777",
    fuelCapacity: 171170, // in kg
    range: 14685, // in km
  },
};

// Fuel burn rate of ~6000 kg/hour * 5x speed = ~8.33 kg/second
const FUEL_BURN_RATE = 8.33;
// Moving at ~900 km/h * 5x speed = ~1.25 km/second
const SPEED_KM_PER_SEC = 1.25;

export default function Home() {
  const [recommendations, setRecommendations] = useState<AirportInfo[]>([]);
  const [pending, startTransition] = useTransition();
  const [flightState, setFlightState] = useState<FlightState>(INITIAL_FLIGHT_STATE);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlightState(prev => {
        // Calculate new fuel level
        const newFuel = Math.max(0, prev.remainingFuel - FUEL_BURN_RATE);
        
        // Move position eastward (adjust longitude)
        const newLongitude = prev.currentPosition.longitude + (SPEED_KM_PER_SEC / 111.32); // roughly convert km to degrees
        
        return {
          ...prev,
          remainingFuel: newFuel,
          currentPosition: {
            ...prev.currentPosition,
            longitude: newLongitude
          }
        };
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const fetchRecommendations = async () => {
    const airports = await getAirportRecommendations(flightState);
    setRecommendations(airports);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-3 bg-sand-1 py-2.5 border-b border-sand-5">
        <div className="flex gap-2 items-center text-teal-12">
          <ShadowIcon className="size-6" />
          <h1 className="text-2xl font-serif font-bold">Detour Dynamics</h1>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="min-w-80 border-r border-sand-5 bg-sand-1 py-4 px-6 space-y-4">
          <div>
            <h2 className="text-lg font-medium mb-2">Current Flight Status</h2>
            <dl className="space-y-2">
              <div>
                <dt className="text-sand-11 font-medium text-sm font-mono uppercase">POSITION</dt>
                <dd className="tabular-nums">
                  {flightState.currentPosition.latitude.toFixed(4)}°N,{" "}
                  {flightState.currentPosition.longitude.toFixed(4)}°W
                </dd>
              </div>
              <div>
                <dt className="text-sand-11 font-medium text-sm font-mono uppercase">REMAINING FUEL</dt>
                <dd className="tabular-nums">{flightState.remainingFuel.toLocaleString()} kg</dd>
              </div>
              <div>
                <dt className="text-sand-11 font-medium text-sm font-mono uppercase">AIRCRAFT</dt>
                <dd className="tabular-nums">{flightState.airplaneModel.type}</dd>
              </div>
              <div>
                <dt className="text-sand-11 font-medium text-sm font-mono uppercase">RANGE REMAIN</dt>
                <dd className="tabular-nums">{flightState.airplaneModel.range.toLocaleString()} km</dd>
              </div>
            </dl>
          </div>

          <div className="border-t border-sand-5 -mx-6 p-3">
            <button
              disabled={pending}
              onClick={() => startTransition(fetchRecommendations)}
              className="w-full bg-tomato-3 border border-tomato-6 text-tomato-9 hover:bg-tomato-4 transition font-medium py-2 px-4 rounded-xl flex gap-2 items-center justify-center"
            >
              {pending ? (
                <LightningBoltIcon className="size-4 animate-pulse" />
              ) : (
                <SewingPinIcon className="size-4" />
              )}
              Calculate Diversion
            </button>
          </div>
        </aside>

        <div className="flex-1 bg-sand-2">
          <main className="flex-1 bg-sand-2 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((airport) => (
              <AirportRecommendation
                key={airport.icao}
                airport={airport as AirportInfo & { distance: number }}
              />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
