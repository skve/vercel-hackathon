import { AirportInfo } from "../types/aviation";
import { MetarDisplay } from "./MetarDisplay";
import { NotamDisplay } from "./NotamDisplay";

export function AirportRecommendation({
  airport,
}: {
  airport: AirportInfo & { distance: number; analysis?: { isRecommended: boolean; summary: string; notes: string[]; derogations: string[] } };
}) {
  const recommendationColor = airport.analysis?.isRecommended 
    ? "bg-grass-1 border-grass-6" 
    : "bg-red-1 border-red-6";

  const recommendationBadge = airport.analysis?.isRecommended ? (
    <span className="bg-grass-3 text-grass-11 border border-grass-6 rounded-full px-3 py-1 text-sm font-medium">
      Recommended
    </span>
  ) : (
    <span className="bg-red-3 text-red-11 border border-red-6 rounded-full px-3 py-1 text-sm font-medium">
      Not Recommended
    </span>
  );

  return (
    <div className={`border rounded-2xl p-6 mb-4 ${recommendationColor}`}>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl tracking-tight font-medium">
          {airport.name} ({airport.icao})
        </h2>
        {airport.analysis && recommendationBadge}
      </div>

      <p className="text-base text-sand-11 flex gap-2 items-center mb-4">
        <span className="font-medium">Distance</span>{" "}
        <span className="text-grass-9 bg-grass-2 border border-grass-6 rounded-md px-2 py-0.5 font-mono">{airport.distance.toFixed(2)}nm</span>
      </p>

      {airport.analysis && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Analysis</h3>
          <p className="mb-2 font-medium">{airport.analysis.summary}</p>

          {airport.analysis.notes.length > 0 && (
            <div className="mb-2">
              <h4 className="font-medium text-grass-11">Positive Notes:</h4>
              <ul className="list-disc list-inside text-grass-11">
                {airport.analysis.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}
          {airport.analysis.derogations.length > 0 && (
            <div className="mb-2">
              <h4 className="font-medium text-red-11">Derogations:</h4>
              <ul className="list-disc list-inside text-red-11">
                {airport.analysis.derogations.map((derogation, index) => (
                  <li key={index}>{derogation}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetarDisplay metar={airport.metar} isRecommended={airport.analysis?.isRecommended ?? false} />
        <NotamDisplay notams={airport.notams} isRecommended={airport.analysis?.isRecommended ?? false} />
      </div>
    </div>
  );
}
