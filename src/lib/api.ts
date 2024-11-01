export async function detectMood(imageData: string): Promise<MoodData> {
  // Simulated API call for mood detection
  return new Promise((resolve) => {
    setTimeout(() => {
      const moods = ['happy', 'sad', 'neutral', 'energized', 'calm'] as const;
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      
      resolve({
        mood: randomMood,
        timestamp: new Date().toISOString(),
        confidence: Math.random() * 0.5 + 0.5
      });
    }, 500);
  });
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  // Simulated weather API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        temperature: Math.floor(Math.random() * 30),
        condition: ['Sunny', 'Cloudy', 'Partly Cloudy', 'Rainy'][Math.floor(Math.random() * 4)],
        location: 'New York, NY',
        humidity: Math.floor(Math.random() * 100),
        windSpeed: Math.floor(Math.random() * 20)
      });
    }, 500);
  });
}

export async function getAffirmation(mood: string): Promise<DailyAffirmation> {
  // Simulated affirmation API call
  const affirmations = {
    happy: 'Your positive energy is contagious!',
    sad: 'Every day is a new beginning. Take a deep breath.',
    neutral: 'You are capable of amazing things.',
    energized: 'Channel your energy into something extraordinary!',
    calm: 'Your tranquility is your superpower.'
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        text: affirmations[mood as keyof typeof affirmations] || affirmations.neutral,
        category: 'daily',
        timestamp: new Date().toISOString()
      });
    }, 500);
  });
}