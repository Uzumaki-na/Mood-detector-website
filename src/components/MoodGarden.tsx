import React from 'react';
import { Flower2, Cloud, Sun, Sprout } from 'lucide-react';
import { useMood } from '../context/MoodContext';

const moodPlants = {
  happy: { icon: Sun, color: 'text-yellow-500', growth: 'scale-100' },
  sad: { icon: Cloud, color: 'text-blue-500', growth: 'scale-75' },
  neutral: { icon: Sprout, color: 'text-gray-500', growth: 'scale-90' },
  energized: { icon: Flower2, color: 'text-red-500', growth: 'scale-110' },
  calm: { icon: Flower2, color: 'text-green-500', growth: 'scale-100' }
};

export function MoodGarden() {
  const { moodHistory } = useMood();

  return (
    <div className="widget col-span-2">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Mood Garden</h2>
      <div className="grid grid-cols-7 gap-4 p-4 bg-gradient-to-b from-green-50 to-emerald-100 rounded-lg">
        {moodHistory.map((data, index) => {
          const plant = moodPlants[data.mood];
          const Icon = plant.icon;
          return (
            <div key={index} className="flex flex-col items-center">
              <Icon 
                className={`w-8 h-8 ${plant.color} transform ${plant.growth} transition-all duration-500`}
              />
              <div className="h-4 w-1 bg-green-800 mt-1" />
              <span className="text-xs text-gray-600 mt-2">
                {new Date(data.timestamp).toLocaleDateString(undefined, { weekday: 'short' })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}