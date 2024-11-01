import React from 'react';
import { Quote, Loader } from 'lucide-react';
import { useMood } from '../context/MoodContext';
import { getAffirmation } from '../lib/api';
import type { DailyAffirmation } from '../types';

export function AffirmationWidget() {
  const { currentMood } = useMood();
  const [affirmation, setAffirmation] = React.useState<DailyAffirmation | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!currentMood) return;

    async function fetchAffirmation() {
      try {
        setIsLoading(true);
        const data = await getAffirmation(currentMood.mood);
        setAffirmation(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch affirmation');
        console.error('Affirmation error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAffirmation();
  }, [currentMood]);

  if (error) {
    return (
      <div className="widget col-span-2">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="widget col-span-2">
      <div className="flex items-center gap-3 mb-4">
        <Quote className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-800">Daily Affirmation</h2>
        {isLoading && <Loader className="w-4 h-4 animate-spin ml-auto" />}
      </div>
      
      {affirmation ? (
        <>
          <blockquote className="text-xl font-medium text-gray-700 italic">
            "{affirmation.text}"
          </blockquote>
          
          <div className="mt-4 text-sm text-gray-600">
            Category: <span className="capitalize">{affirmation.category}</span>
          </div>
        </>
      ) : (
        <div className="text-gray-500">Loading affirmation...</div>
      )}
    </div>
  );
}