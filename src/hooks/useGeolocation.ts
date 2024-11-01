import { useState, useEffect } from 'react';

export function useGeolocation() {
  const [coords, setCoords] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const successHandler = (position: GeolocationPosition) => {
      setCoords({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      setError(null);
    };

    const errorHandler = (err: GeolocationPositionError) => {
      setError(err.message);
    };

    const watchId = navigator.geolocation.watchPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { ...coords, error };
}