import React from 'react';
import { TimeWidget } from './components/TimeWidget';
import { WeatherWidget } from './components/WeatherWidget';
import { MoodWidget } from './components/MoodWidget';
import { AffirmationWidget } from './components/AffirmationWidget';
import { MoodGarden } from './components/MoodGarden';
import { MoodJournal } from './components/MoodJournal';
import { MoodPlaylist } from './components/MoodPlaylist';
import { ActivitySuggestions } from './components/ActivitySuggestions';
import { MoodProvider } from './context/MoodContext';

export function App() {
  const [timeOfDay, setTimeOfDay] = React.useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');

  React.useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) setTimeOfDay('morning');
      else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon');
      else if (hour >= 17 && hour < 21) setTimeOfDay('evening');
      else setTimeOfDay('night');
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  const gradients = {
    morning: 'from-rose-100 via-violet-100 to-orange-100',
    afternoon: 'from-sky-100 via-cyan-100 to-indigo-100',
    evening: 'from-amber-100 via-orange-100 to-rose-100',
    night: 'from-indigo-900 via-purple-900 to-blue-900'
  };

  const textColor = timeOfDay === 'night' ? 'text-white' : 'text-gray-900';

  return (
    <MoodProvider>
      <div className={`min-h-screen bg-gradient-to-br ${gradients[timeOfDay]} transition-colors duration-1000`}>
        <div className="container mx-auto px-4 py-8">
          <header className={`text-center mb-12 ${textColor}`}>
            <h1 className="text-4xl font-bold mb-2">Virtual Magic Mirror</h1>
            <p className="text-lg opacity-80">Your personal wellness companion</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <TimeWidget />
            <WeatherWidget />
            <MoodWidget />
            <AffirmationWidget />
            <MoodGarden />
            <MoodJournal />
            <MoodPlaylist />
            <ActivitySuggestions />
          </div>
        </div>
      </div>
    </MoodProvider>
  );
}