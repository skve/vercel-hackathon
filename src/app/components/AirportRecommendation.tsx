import { AirportInfo } from '../../types/aviation';
import { MetarDisplay } from './MetarDisplay';
import { NotamDisplay } from './NotamDisplay';

export function AirportRecommendation({ airport }: { airport: AirportInfo & { distance: number } }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2">{airport.name} ({airport.icao})</h2>
      <p className="text-lg mb-4">Distance: {airport.distance.toFixed(2)} km</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetarDisplay metar={airport.metar} />
        <NotamDisplay notams={airport.notams} />
      </div>
    </div>
  );
}

