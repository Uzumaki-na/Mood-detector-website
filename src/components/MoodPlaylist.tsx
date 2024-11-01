import React from 'react';
import { Music, PlayCircle } from 'lucide-react';
import { useMood } from '../context/MoodContext';

const moodPlaylists = {
  happy: [
    { title: 'Walking on Sunshine', artist: 'Katrina & The Waves' },
    { title: 'Happy', artist: 'Pharrell Williams' },
    { title: 'Good Vibrations', artist: 'The Beach Boys' }
  ],
  sad: [
    { title: 'Someone Like You', artist: 'Adele' },
    { title: 'Fix You', artist: 'Coldplay' },
    { title: 'The Sound of Silence', artist: 'Simon & Garfunkel' }
  ],
  neutral: [
    { title: 'Here Comes the Sun', artist: 'The Beatles' },
    { title: 'Three Little Birds', artist: 'Bob Marley' },
    { title: 'What a Wonderful World', artist: 'Louis Armstrong' }
  ],
  energized: [
    { title: 'Eye of the Tiger', artist: 'Survivor' },
    { title: "Can't Hold Us", artist: 'Macklemore & Ryan Lewis' },
    { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' }
  ],
  calm: [
    { title: 'Weightless', artist: 'Marconi Union' },
    { title: 'River Flows in You', artist: 'Yiruma' },
    { title: 'Claire de Lune', artist: 'Claude Debussy' }
  ]
};

export function MoodPlaylist() {
  const { currentMood } = useMood();
  const playlist = currentMood ? moodPlaylists[currentMood.mood] : moodPlaylists.neutral;

  return (
    <div className="widget">
      <div className="flex items-center gap-3 mb-4">
        <Music className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-800">Mood Playlist</h2>
      </div>

      <div className="space-y-3">
        {playlist.map((song, index) => (
          <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <PlayCircle className="w-5 h-5 text-indigo-600" />
            <div>
              <div className="font-medium text-gray-800">{song.title}</div>
              <div className="text-sm text-gray-500">{song.artist}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}