import AirportMap from "./components/map";

export default function Home() {
  return <AirportMap airports={[{ name: "DEN", longitude: -104.6732, latitude: 39.86167 }] } />;
}
