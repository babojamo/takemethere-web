import { useCallback, useEffect, useState } from 'react';
import { getCurrentLocation } from '../utils/takeme/geolocation';
import { LatLng } from '../types/route';

export default function useCurrentLocation() {
  const [currentLocation, setCurrentLocation] = useState<LatLng>();

  const getGeoLocaiton = useCallback(async () => {
    const location = await getCurrentLocation();
    console.log(location);
    setCurrentLocation(location);
  }, []);

  useEffect(() => {
    getGeoLocaiton();
  }, [getGeoLocaiton]);

  return {
    currentLocation
  };
}
