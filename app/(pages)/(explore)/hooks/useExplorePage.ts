import RouteService from "@/app/services/RouteService";
import { LatLng, Route, RouteFares } from "@/app/types/route";
import { useState } from "react";

export const useExplorePage = () => {

  const [currentRouteFareIndex, setCurrentRouteFareIndex] = useState<Number>(0);
  const [routeFares, setRouteFares] = useState<RouteFares[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);

  const searchLocation = async (query: string) => {
    const url =
      "https://nominatim.openstreetmap.org/search?format=json&limit=8&q=" +
      encodeURIComponent(query);

    const res = await fetch(url, {
      headers: {
        // Nominatim likes identifying UA; if you have a domain, set a proper one server-side.
        "Accept": "application/json",
      },
    });

    const data = await res.json();

    return data.map((x: any) => ({
      label: x.display_name,
      lat: Number(x.lat),
      lng: Number(x.lon),
      raw: x,
    }));
  }

  const searchNearestRoutes = async (origin: LatLng, destination: LatLng) => {
    const { data } = await RouteService.getNearestRoutes({
      origin_lat: origin.lat,
      origin_lng: origin.lng,
      destination_lat: destination.lat,
      destination_lng: destination.lng,
      radius: 100
    });

    const fares: RouteFares[] = data.map(r => ({ total_fare: 0, route_fare: r }));
    setRouteFares(fares);

    if (fares.length != 0) {
      // Get the first route only and set as initial
      const fare = fares[0];
      setRoutes(fare.route_fare.map(r => r.route));
    }
  }

  return {
    searchLocation,
    searchNearestRoutes,
    routes
  };
};
