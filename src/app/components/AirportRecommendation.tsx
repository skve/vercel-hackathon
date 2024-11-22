import { AirportInfo } from "../types/aviation";
import { MetarDisplay } from "./MetarDisplay";
import { NotamDisplay } from "./NotamDisplay";

export function AirportRecommendation({
  airport,
}: {
  airport: AirportInfo & { distance: number };
}) {
  return (
    <div className="bg-sand-1 border border-sand-5  rounded-2xl  p-6 mb-4">
      <h2 className="text-2xl tracking-tight font-medium mb-2">
        {airport.name} ({airport.icao})
      </h2>

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
              <h4 className="font-medium">Positive Notes:</h4>
              <ul className="list-disc list-inside">
                {airport.analysis.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}
          {airport.analysis.derogations.length > 0 && (
            <div className="mb-2">
              <h4 className="font-medium">Derogations:</h4>
              <ul className="list-disc list-inside">
                {airport.analysis.derogations.map((derogation, index) => (
                  <li key={index}>{derogation}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetarDisplay metar={airport.metar} />
        <NotamDisplay notams={airport.notams} />
      </div>
    </div>
  );
}
