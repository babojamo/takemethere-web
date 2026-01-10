'use client';

import dynamic from 'next/dynamic';
import React, { useCallback, useEffect, useState } from 'react';
import { FloatingRouteSearch, LocationOption } from '../components/takeme/explore/search-bar/component';
import { useExplorePage } from './(explore)/hooks/useExplorePage';
import { FloatingRouteList } from '../components/takeme/explore/suggested-routes/component';
import { getCurrentLocation } from '../utils/takeme/geolocation';
import { LatLng } from '../types/route';
import useCurrentLocation from '../hooks/useCurrentLocation';
import { ProgressSpinner } from 'primereact/progressspinner';
import { LoadingProgress } from '../components/loading-progress/component';

const RouteMapper = dynamic(() => import('@/app/components/takeme/mapper/component').then((m) => m.RouteMapper), { ssr: false });


const HomePage = () => {
  const {
    searchLocation,
    searchNearestRoutes,
    routes,
    routeFares,
    setRoutes,
    isRouteFareFetching,
    originCoordinates,
    destinationCoordinates,
    setDestinationCoordinates,
    setOriginCoordinates,
  } = useExplorePage();
  const { currentLocation } = useCurrentLocation();

  const onSearchRoute = ({ origin, destination }: any) => {
    const orig = { lat: Number(origin.lat), lng: Number(origin.lng) };
    const dest = { lat: Number(destination.lat), lng: Number(destination.lng) };

    setOriginCoordinates(orig);
    setDestinationCoordinates(dest)
    searchNearestRoutes(orig, dest);
  }
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <RouteMapper
        origin={originCoordinates}
        destination={destinationCoordinates}
        initialCenter={currentLocation}
        routes={routes} />

      <FloatingRouteSearch
        searchLocations={searchLocation}
        onSearchRoute={onSearchRoute}
      />

      {routeFares.length != 0 &&
        <FloatingRouteList
          route_fares={routeFares}
          onRouteClick={routeFare => setRoutes(routeFare.route_fare.map(r => r.route))}
        />
      }

      {isRouteFareFetching &&
        <LoadingProgress />
      }
    </div>
  );
};

export default HomePage;
