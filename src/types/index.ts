export interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
}

export interface MoodData {
  mood: 'happy' | 'sad' | 'neutral' | 'energized' | 'calm';
  timestamp: string;
}

export interface DailyAffirmation {
  text: string;
  category: string;
}