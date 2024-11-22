import { AirportInfo, Coordinates } from '../app/types/aviation';

export async function fetchSurroundingAirports(position: Coordinates): Promise<AirportInfo[]> {
  // This would typically be an API call. For now, we'll return mock data.
  return [
    {
      icao: 'KJFK',
      name: 'John F. Kennedy International Airport',
      coordinates: { latitude: 40.6413, longitude: -73.7781 },
      metar: {
        raw: 'KJFK 152151Z 18009KT 10SM FEW060 25/18 A3001 RMK AO2 SLP163 T02500178',
        temperature: 25,
        dewpoint: 18,
        windDirection: 180,
        windSpeed: 9,
        visibility: 10,
        weatherConditions: ['FEW060'],
      },
      notams: [
        { id: 'NOTAM1', text: 'RWY 13L/31R CLSD' },
        { id: 'NOTAM2', text: 'TWY B CLSD BTN TWY A AND TWY C' },
      ],
    },
    // Add more mock airports here...
  ];
}
