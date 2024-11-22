export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Airport {
  icao: string;
  name: string;
  coordinates: Coordinates;
}

export interface Metar {
  raw: string;
  temperature: number;
  dewpoint: number;
  windDirection: number;
  windSpeed: number;
  visibility: number;
  weatherConditions: string[];
}

export interface Notam {
  id: string;
  text: string;
}

export interface AirportInfo extends Airport {
  metar: Metar;
  notams: Notam[];
}

export interface AirplaneModel {
  type: string;
  fuelCapacity: number;
  range: number;
}

export interface FlightState {
  currentPosition: Coordinates;
  remainingFuel: number;
  airplaneModel: AirplaneModel;
}

export interface AirportAnalysis {
  summary: string;
  notes: string[];
  derogations: string[];
  isRecommended: boolean;
}

export interface AirportInfo extends Airport {
  metar: Metar;
  notams: Notam[];
  analysis?: AirportAnalysis;
}
