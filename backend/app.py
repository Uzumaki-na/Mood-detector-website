from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from tensorflow.keras.models import load_model
import requests
import os
from dotenv import load_dotenv
from datetime import datetime

app = Flask(__name__)
CORS(app)
load_dotenv()

# Initialize face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Emotion mapping
EMOTIONS = ['angry', 'disgust', 'fear', 'happy', 'sad', 'surprise', 'neutral']

def map_emotion_to_mood(emotion):
    mood_mapping = {
        'happy': 'happy',
        'sad': 'sad',
        'neutral': 'neutral',
        'surprise': 'energized',
        'angry': 'energized',
        'fear': 'calm',
        'disgust': 'calm'
    }
    return mood_mapping.get(emotion, 'neutral')

@app.route('/api/mood', methods=['POST'])
def detect_mood():
    try:
        # Get image data from request
        file = request.files.get('image')
        if not file:
            return jsonify({'error': 'No image provided'}), 400

        # Convert image to OpenCV format
        nparr = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Convert to grayscale for face detection
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Detect faces
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        
        if len(faces) == 0:
            return jsonify({'error': 'No face detected'}), 400
            
        # Process the first face found
        (x, y, w, h) = faces[0]
        face_roi = gray[y:y+h, x:x+w]
        
        # Prepare image for emotion detection
        face_roi = cv2.resize(face_roi, (48, 48))
        face_roi = face_roi.astype("float") / 255.0
        face_roi = np.expand_dims(face_roi, axis=0)
        face_roi = np.expand_dims(face_roi, axis=-1)
        
        # Get emotion prediction
        emotion_idx = np.argmax(model.predict(face_roi))
        emotion = EMOTIONS[emotion_idx]
        mood = map_emotion_to_mood(emotion)
        
        return jsonify({
            'mood': mood,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/weather', methods=['GET'])
def get_weather():
    try:
        lat = request.args.get('lat')
        lon = request.args.get('lon')
        
        if not lat or not lon:
            return jsonify({'error': 'Location coordinates required'}), 400
            
        api_key = os.getenv('WEATHER_API_KEY')
        url = f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric'
        
        response = requests.get(url)
        data = response.json()
        
        return jsonify({
            'temperature': round(data['main']['temp']),
            'condition': data['weather'][0]['main'],
            'location': data['name']
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/affirmation', methods=['GET'])
def get_affirmation():
    mood = request.args.get('mood', 'neutral')
    
    affirmations = {
        'happy': [
            "Your positive energy is contagious. Keep spreading joy!",
            "You're making the world brighter with your smile.",
            "Your happiness inspires others to find their joy."
        ],
        'sad': [
            "Every cloud has a silver lining. Better days are ahead.",
            "You are stronger than you know. Take it one step at a time.",
            "It's okay not to be okay. Tomorrow is a new day."
        ],
        'neutral': [
            "You are exactly where you need to be right now.",
            "Every day is a fresh start full of possibilities.",
            "Your potential is limitless."
        ],
        'energized': [
            "Channel your energy into something amazing today!",
            "Your enthusiasm moves mountains. Keep that spirit!",
            "You're unstoppable when you're in your element."
        ],
        'calm': [
            "Your tranquility is your superpower.",
            "In calmness lies strength and clarity.",
            "You bring peace wherever you go."
        ]
    }
    
    mood_affirmations = affirmations.get(mood, affirmations['neutral'])
    selected = np.random.choice(mood_affirmations)
    
    return jsonify({
        'text': selected,
        'category': 'daily'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)