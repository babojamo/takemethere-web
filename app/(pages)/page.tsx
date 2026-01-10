'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { FloatingRouteSearch, LocationOption } from '../components/takeme/explore/search-bar/component';
import { useExplorePage } from './(explore)/hooks/useExplorePage';

const RouteMapper = dynamic(() => import('@/app/components/takeme/mapper/component').then((m) => m.RouteMapper), { ssr: false });


const HomePage = () => {
  const { searchLocation, searchNearestRoutes, routes } = useExplorePage();

  const onSearchRoute = ({ origin, destination }: any) => {
    searchNearestRoutes(
      { lat: Number(origin.lat), lng: Number(origin.lng) },
      { lat: destination.lat, lng: destination.lng }
    );
  }

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <RouteMapper routes={routes}/>
      <FloatingRouteSearch
        searchLocations={searchLocation}
        onSearchRoute={onSearchRoute}
      />
    </div>
  );
};

export default HomePage;
