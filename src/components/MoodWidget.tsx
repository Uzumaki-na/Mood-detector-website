import React from 'react';
import { Brain, TrendingUp, Loader } from 'lucide-react';
import { useMood } from '../context/MoodContext';

const moodColors = {
  happy: 'bg-yellow-500',
  sad: 'bg-blue-500',
  neutral: 'bg-gray-500',
  energized: 'bg-red-500',
  calm: 'bg-green-500',
};

export function MoodWidget() {
  const { currentMood, moodHistory, isLoading, error } = useMood();

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
        <Brain className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-800">Mood Analysis</h2>
        {isLoading && <Loader className="w-4 h-4 animate-spin ml-auto" />}
      </div>
      
      {currentMood && (
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${moodColors[currentMood.mood]}`} />
            <span className="text-lg font-medium capitalize">{currentMood.mood}</span>
          </div>
        </div>
      )}

      {moodHistory.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-medium text-gray-700">Weekly Trend</h3>
          </div>
          <div className="flex gap-1 h-20">
            {moodHistory.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col justify-end">
                <div 
                  className={`${moodColors[data.mood]} rounded-t-sm w-full h-full opacity-80`}
                />
                <span className="text-xs text-gray-600 mt-1">
                  {new Date(data.timestamp).toLocaleDateString(undefined, { weekday: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}