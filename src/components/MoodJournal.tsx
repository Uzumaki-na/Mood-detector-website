import React from 'react';
import { Book, Plus } from 'lucide-react';
import { useMood } from '../context/MoodContext';

export function MoodJournal() {
  const [entry, setEntry] = React.useState('');
  const [entries, setEntries] = React.useState<Array<{ text: string; timestamp: string; mood: string }>>([]);
  const { currentMood } = useMood();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.trim() || !currentMood) return;

    setEntries(prev => [{
      text: entry,
      timestamp: new Date().toISOString(),
      mood: currentMood.mood
    }, ...prev]);
    setEntry('');
  };

  return (
    <div className="widget col-span-2">
      <div className="flex items-center gap-3 mb-4">
        <Book className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-800">Mood Journal</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="How are you feeling today?"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>

      <div className="space-y-3 max-h-48 overflow-y-auto">
        {entries.map((entry, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg">
            <p className="text-gray-800">{entry.text}</p>
            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <span>Mood: <span className="capitalize">{entry.mood}</span></span>
              <time>{new Date(entry.timestamp).toLocaleString()}</time>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}