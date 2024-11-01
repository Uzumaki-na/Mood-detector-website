export interface MoodData {
  mood: 'happy' | 'sad' | 'neutral' | 'energized' | 'calm';
  timestamp: string;
  confidence: number;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  humidity: number;
  windSpeed: number;
}

export interface DailyAffirmation {
  text: string;
  category: string;
  timestamp: string;
}