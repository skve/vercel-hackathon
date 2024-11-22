"use client";

import { useState, useTransition } from "react";
import { getAirportRecommendations } from "./actions";
import { AirportInfo, FlightState } from "./types/aviation";
import { AirportRecommendation } from "./components/AirportRecommendation";
import {
  LightningBoltIcon,
  SewingPinIcon,
  ShadowIcon,
} from "@radix-ui/react-icons";

const flightState: FlightState = {
  currentPosition: { latitude: 40.7128, longitude: -74.006 }, // New York City coordinates
  remainingFuel: 20000, // in kg
  airplaneModel: {
    type: "Boeing 777",
    fuelCapacity: 171170, // in kg
    range: 14685, // in km
  },
};

export default function Home() {
  const [recommendations, setRecommendations] = useState<AirportInfo[]>([]);
  const [pending, startTransition] = useTransition();

  const fetchRecommendations = async () => {
    const airports = await getAirportRecommendations(flightState);
    setRecommendations(airports);
  };

  return (
    <div>
      <header className="px-3 bg-sand-2 py-2.5 border-b border-sand-5 ">
        <div className="flex gap-2 items-center text-teal-12">
          <ShadowIcon className="size-6" />
          <h1 className="text-2xl font-serif font-bold">Detour Dynamics</h1>
        </div>
      </header>

      <nav className="bg-sand-1 border-b border-sand-5 px-3 py-2.5">
        <button
          disabled={pending}
          onClick={() => startTransition(fetchRecommendations)}
          className="bg-tomato-3 border border-tomato-6 text-tomato-9 hover:bg-tomato-4 transition font-medium py-2 px-4 rounded-xl flex gap-2 items-center"
        >
          {pending ? (
            <LightningBoltIcon className="size-4 animate-pulse" />
          ) : (
            <SewingPinIcon className="size-4" />
          )}
          Fetch Airport Recommendations{" "}
        </button>
      </nav>

      <main className="px-3 grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4 py-2.5">
        {recommendations.map((airport) => (
          <AirportRecommendation
            key={airport.icao}
            airport={airport as AirportInfo & { distance: number }}
          />
        ))}
      </main>
    </div>
  );
}
