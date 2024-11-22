"use server";

import { fetchSurroundingAirports } from "../services/aviationApi";
import { analyzeAirportData } from "../services/aiService";
import { AirportInfo, FlightState } from "./types/aviation";
import { calculateDistance } from "../utils/distance";

export async function getAirportRecommendations(
  flightState: FlightState
): Promise<AirportInfo[]> {
  const airports = await fetchSurroundingAirports(flightState.currentPosition);

  const analyzedAirports = await Promise.all(
    airports.map(async (airport) => {
      const eta = new Date(Date.now() + 3600000); // Assuming 1 hour ETA for simplicity
      const analysisResponse = await analyzeAirportData(
        airport.metar.raw,
        airport.notams.map((n) => n.text),
        flightState,
        eta
      );
      const analysis = analysisResponse.object;

      return {
        ...airport,
        distance: calculateDistance(
          flightState.currentPosition,
          airport.coordinates
        ),
        analysis,
      };
    })
  );

  return analyzedAirports.sort((a, b) => {
    const aScore = a.distance + a.analysis.derogations.length * 10;
    const bScore = b.distance + b.analysis.derogations.length * 10;
    return aScore - bScore;
  });
}
