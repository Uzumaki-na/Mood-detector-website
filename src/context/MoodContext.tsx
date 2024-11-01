import React, { createContext, useContext, useState, useEffect } from 'react';
import { detectMood } from '../lib/api';
import { useWebcam } from '../hooks/useWebcam';
import type { MoodData } from '../types';

interface MoodContextType {
  currentMood: MoodData | null;
  moodHistory: MoodData[];
  isLoading: boolean;
  error: string | null;
}

const MoodContext = createContext<MoodContextType>({
  currentMood: null,
  moodHistory: [],
  isLoading: false,
  error: null,
});

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [currentMood, setCurrentMood] = useState<MoodData | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { videoRef, isStreaming, captureFrame } = useWebcam();

  useEffect(() => {
    if (!isStreaming) return;

    const detectMoodInterval = setInterval(async () => {
      try {
        const frame = await captureFrame();
        if (!frame) return;

        setIsLoading(true);
        const moodData = await detectMood(frame);
        
        setCurrentMood(moodData);
        setMoodHistory(prev => {
          const newHistory = [...prev, moodData];
          return newHistory.slice(-7); // Keep last 7 days
        });
        
        setError(null);
      } catch (err) {
        setError('Failed to detect mood');
        console.error('Mood detection error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 30000); // Check mood every 30 seconds

    return () => clearInterval(detectMoodInterval);
  }, [isStreaming, captureFrame]);

  return (
    <MoodContext.Provider value={{ currentMood, moodHistory, isLoading, error }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="hidden"
      />
      {children}
    </MoodContext.Provider>
  );
}

export const useMood = () => useContext(MoodContext);