import React from 'react';
import { Cloud, Sun, Loader } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { getWeather } from '../lib/api';
import type { WeatherData } from '../types';

export function WeatherWidget() {
  const [weather, setWeather] = React.useState<WeatherData | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { latitude, longitude, error: geoError } = useGeolocation();

  React.useEffect(() => {
    if (!latitude || !longitude) return;

    async function fetchWeather() {
      try {
        setIsLoading(true);
        const data = await getWeather(latitude, longitude);
        setWeather(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error('Weather error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, [latitude, longitude]);

  if (geoError) {
    return (
      <div className="widget">
        <div className="text-red-500">Location access required for weather data</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="widget">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="widget">
      <div className="flex items-center gap-3 mb-4">
        {weather?.condition.toLowerCase().includes('cloud') ? (
          <Cloud className="w-5 h-5 text-indigo-600" />
        ) : (
          <Sun className="w-5 h-5 text-indigo-600" />
        )}
        <h2 className="text-lg font-semibold text-gray-800">Weather</h2>
        {isLoading && <Loader className="w-4 h-4 animate-spin ml-auto" />}
      </div>
      
      {weather ? (
        <>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {weather.temperature}°C
          </div>
          
          <div className="text-gray-600">
            <div>{weather.condition}</div>
            <div className="text-sm mt-1">{weather.location}</div>
          </div>
        </>
      ) : (
        <div className="text-gray-500">Loading weather data...</div>
      )}
    </div>
  );
}