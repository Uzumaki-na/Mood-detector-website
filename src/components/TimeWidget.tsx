import React from 'react';
import { Clock } from 'lucide-react';

export function TimeWidget() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="widget">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-800">Time</h2>
      </div>
      
      <div className="text-3xl font-bold text-gray-900">
        {time.toLocaleTimeString()}
      </div>
      
      <div className="text-gray-600 mt-2">
        {time.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    </div>
  );
}