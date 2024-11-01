import React from 'react';
import { Lightbulb } from 'lucide-react';
import { useMood } from '../context/MoodContext';

const moodActivities = {
  happy: [
    'Start a creative project',
    'Call a friend to share your joy',
    'Try a new hobby'
  ],
  sad: [
    'Take a relaxing bath',
    'Write in your journal',
    'Practice gentle yoga'
  ],
  neutral: [
    'Go for a walk outside',
    'Read a good book',
    'Try mindful meditation'
  ],
  energized: [
    'Go for a run',
    'Dance to your favorite music',
    'Start that project youve been planning'
  ],
  calm: [
    'Practice deep breathing',
    'Do some light stretching',
    'Listen to calming music'
  ]
};

export function ActivitySuggestions() {
  const { currentMood } = useMood();
  const activities = currentMood ? moodActivities[currentMood.mood] : moodActivities.neutral;

  return (
    <div className="widget">
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-800">Suggested Activities</h2>
      </div>

      <ul className="space-y-3">
        {activities.map((activity, index) => (
          <li key={index} className="flex items-center gap-2 text-gray-700">
            <span className="w-2 h-2 bg-indigo-600 rounded-full" />
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
}