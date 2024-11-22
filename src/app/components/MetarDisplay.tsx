import { Metar } from '../types/aviation';

export function MetarDisplay({ metar }: { metar: Metar }) {
  return (
    <div className="bg-sand-3 shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">METAR</h3>
      <p className="text-sm text-sand-11 mb-2">{metar.raw}</p>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <span className="font-medium">Temperature:</span> {metar.temperature}°C
        </div>
        <div>
          <span className="font-medium">Dewpoint:</span> {metar.dewpoint}°C
        </div>
        <div>
          <span className="font-medium">Wind:</span> {metar.windDirection}° at {metar.windSpeed} knots
        </div>
        <div>
          <span className="font-medium">Visibility:</span> {metar.visibility} SM
        </div>
      </div>
      <div className="mt-2">
        <span className="font-medium">Conditions:</span> {metar.weatherConditions.join(', ')}
      </div>
    </div>
  );
}

