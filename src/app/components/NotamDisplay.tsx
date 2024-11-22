import { Notam } from '../types/aviation';

export function NotamDisplay({ notams }: { notams: Notam[] }) {
  return (
    <div className="bg-sand-3 shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-2">NOTAMs</h3>
      {notams.map((notam) => (
        <div key={notam.id} className="mb-2 last:mb-0">
          <span className="font-medium">{notam.id}:</span> {notam.text}
        </div>
      ))}
    </div>
  );
}

