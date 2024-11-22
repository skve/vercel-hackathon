'use server'

import { fetchSurroundingAirports } from '../services/aviationApi';
import { calculateDistance } from '../utils/distance';
import { AirportInfo, FlightState } from '../types/aviation';

export async function getAirportRecommendations(flightState: FlightState): Promise<AirportInfo[]> {
  const airports = await fetchSurroundingAirports(flightState.currentPosition);
  
  // Filter and sort airports based on various factors
  return airports
    .map(airport => ({
      ...airport,
      distance: calculateDistance(flightState.currentPosition, airport.coordinates),
    }))
    .filter(airport => 
      airport.distance <= flightState.airplaneModel.range &&
      !airport.notams.some(notam => notam.text.includes('CLSD')) // Filter out closed airports
    )
    .sort((a, b) => {
      // Sort by a combination of distance and weather conditions
      const aScore = a.distance + (a.metar.weatherConditions.length * 10);
      const bScore = b.distance + (b.metar.weatherConditions.length * 10);
      return aScore - bScore;
    });
}

