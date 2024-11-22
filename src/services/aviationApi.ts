import { AirportInfo, Coordinates } from '../app/types/aviation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    {
      icao: 'KLGA',
      name: 'LaGuardia Airport',
      coordinates: { latitude: 40.7769, longitude: -73.8740 },
      metar: {
        raw: 'KLGA 152151Z 20012KT 1/2SM FG BR SCT045 24/17 A3002',
        temperature: 24,
        dewpoint: 17,
        windDirection: 200,
        windSpeed: 12,
        visibility: 0.5,
        weatherConditions: ['FG', 'BR', 'SCT045'],
      },
      notams: [
        { id: 'NOTAM1', text: 'TWY A LIMITED TO ACFT WINGSPAN 118 FT OR LESS' },
        { id: 'NOTAM2', text: 'RWY LENGTH RESTRICTED TO 7000FT DUE TO CONST' },
      ],
    },
    {
      icao: 'KEWR',
      name: 'Newark Liberty International Airport',
      coordinates: { latitude: 40.6895, longitude: -74.1745 },
      metar: {
        raw: 'KEWR 152151Z 19025G35KT 3SM +TS BKN010 OVC050 26/18 A3001',
        temperature: 26,
        dewpoint: 18,
        windDirection: 190,
        windSpeed: 25,
        visibility: 3,
        weatherConditions: ['+TS', 'BKN010', 'OVC050'],
      },
      notams: [
        { id: 'NOTAM1', text: 'RWY 04L/22R CLSD FOR CONST' },
        { id: 'NOTAM2', text: 'NUMEROUS BIRD ACTIVITY VICINITY OF ARPT' },
      ],
    },
    {
      icao: 'KBOS',
      name: 'Boston Logan International Airport',
      coordinates: { latitude: 42.3656, longitude: -71.0096 },
      metar: {
        raw: 'KBOS 152151Z 14006KT 10SM CLR 23/16 A3003',
        temperature: 23,
        dewpoint: 16,
        windDirection: 140,
        windSpeed: 6,
        visibility: 10,
        weatherConditions: ['CLR'],
      },
      notams: [
        { id: 'NOTAM1', text: 'TWY E CLSD' },
        { id: 'NOTAM2', text: 'EMERG VEHICLES AND EQUIP ON AND NEAR ALL RWYS' },
      ],
    },
    {
      icao: 'KPHL',
      name: 'Philadelphia International Airport',
      coordinates: { latitude: 39.8719, longitude: -75.2411 },
      metar: {
        raw: 'KPHL 152151Z 16007KT 1SM R09/1000FT -DZ FG OVC002 27/18 A3001',
        temperature: 27,
        dewpoint: 18,
        windDirection: 160,
        windSpeed: 7,
        visibility: 1,
        weatherConditions: ['-DZ', 'FG', 'OVC002'],
      },
      notams: [
        { id: 'NOTAM1', text: 'RWY 09/27 CLSD' },
        { id: 'NOTAM2', text: 'ALL ILS APPROACHES OTS' },
      ],
    },
    {
      icao: 'KBDL',
      name: 'Bradley International Airport',
      coordinates: { latitude: 41.9389, longitude: -72.6832 },
      metar: {
        raw: 'KBDL 152151Z 15005KT 10SM SCT070 24/17 A3002',
        temperature: 24,
        dewpoint: 17,
        windDirection: 150,
        windSpeed: 5,
        visibility: 10,
        weatherConditions: ['SCT070'],
      },
      notams: [
        { id: 'NOTAM1', text: 'FUEL FARM UNDER CONST - NO FUEL AVBL' },
        { id: 'NOTAM2', text: 'ALL TWY WEIGHT BEARING CAPACITY LIMITED TO 3000KG' },
      ],
    },
    {
      icao: 'KPVD',
      name: 'Providence T.F. Green Airport',
      coordinates: { latitude: 41.7267, longitude: -71.4329 },
      metar: {
        raw: 'KPVD 152151Z 17008KT 10SM CLR 25/18 A3002',
        temperature: 25,
        dewpoint: 18,
        windDirection: 170,
        windSpeed: 8,
        visibility: 10,
        weatherConditions: ['CLR'],
      },
      notams: [
        { id: 'NOTAM1', text: 'ILS RWY 05 OTS' },
        { id: 'NOTAM2', text: 'CLSD FOR CONST TDY + TMO DUE TO STAFF SHORTAGE' },
      ],
    },
    {
      icao: 'KISP',
      name: 'Long Island MacArthur Airport',
      coordinates: { latitude: 40.7952, longitude: -73.1002 },
      metar: {
        raw: 'KISP 152151Z 19006KT 10SM FEW055 24/17 A3001',
        temperature: 24,
        dewpoint: 17,
        windDirection: 190,
        windSpeed: 6,
        visibility: 10,
        weatherConditions: ['FEW055'],
      },
      notams: [
        { id: 'NOTAM1', text: 'APCH LIGHTING RWY 24 OTS' },
        { id: 'NOTAM2', text: 'ARPT NOT AVBL FOR ACFT OVER 150000 LBS' },
      ],
    },
    {
      icao: 'KHPN',
      name: 'Westchester County Airport',
      coordinates: { latitude: 41.0670, longitude: -73.7076 },
      metar: {
        raw: 'KHPN 152151Z 16007KT 9SM SCT060 25/18 A3001',
        temperature: 25,
        dewpoint: 18,
        windDirection: 160,
        windSpeed: 7,
        visibility: 9,
        weatherConditions: ['SCT060'],
      },
      notams: [
        { id: 'NOTAM1', text: 'TWY C CLSD' },
        { id: 'NOTAM2', text: 'ARPT PPR FOR ACFT WINGSPAN OVER 100FT' },
      ],
    },
    {
      icao: 'KSWF',
      name: 'Stewart International Airport',
      coordinates: { latitude: 41.5040, longitude: -74.1047 },
      metar: {
        raw: 'KSWF 152151Z 18005KT 1/4SM FG VV002 24/17 A3002',
        temperature: 24,
        dewpoint: 17,
        windDirection: 180,
        windSpeed: 5,
        visibility: 0.25,
        weatherConditions: ['FG', 'VV002'],
      },
      notams: [
        { id: 'NOTAM1', text: 'RWY 16/34 SHORTENED BY 1000FT' },
        { id: 'NOTAM2', text: 'BRAKING ACTION POOR ALL RWYS' },
      ],
    },
    {
      icao: 'KALB',
      name: 'Albany International Airport',
      coordinates: { latitude: 42.7483, longitude: -73.8017 },
      metar: {
        raw: 'KALB 152151Z 17006KT 10SM BKN065 23/16 A3002',
        temperature: 23,
        dewpoint: 16,
        windDirection: 170,
        windSpeed: 6,
        visibility: 10,
        weatherConditions: ['BKN065'],
      },
      notams: [
        { id: 'NOTAM1', text: 'TERMINAL CONST IN PROGRESS' },
        { id: 'NOTAM2', text: 'FIRE AND RESCUE SERVICES LIMITED TO ACFT CAT 1-6' },
      ],
    },
  ];
}
