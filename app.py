import logging
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
import firebase_admin
from firebase_admin import credentials, messaging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Configure the database from the config file
app.config.from_object('src.config.Config')

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Initialize Flask-Migrate for handling database migrations
migrate = Migrate(app, db)

# Initialize Firebase Admin SDK
cred = credentials.Certificate('FIREBASE_KEY_PATH')  
firebase_admin.initialize_app(cred)

# Model for storing detection data
class Detection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    device = db.Column(db.String(50))
    time_stamp = db.Column(db.String(100))
    latitude = db.Column(db.String(100))
    longitude = db.Column(db.String(100))
    location = db.Column(db.String(100))
    detection_time = db.Column(db.String(100))
    detection_id = db.Column(db.Integer)
    alert_count = db.Column(db.Integer)
    animal_type = db.Column(db.String(50))

def send_fcm_notification():
    message = messaging.Message(
        notification=messaging.Notification(
            title="New Activity Detected",
            body="A new detection has been recorded.",
        ),
        topic="new_activities"
    )
    response = messaging.send(message)
    print(f"Sent message: {response}")

# Endpoint to save detection data and send a notification
@app.route('/api/deer-detection', methods=['POST'])
def deer_detection():
    data = request.json
    if data:
        # Create a new Detection object
        new_detection = Detection(
            device='Raspberry Pi',
            time_stamp=data.get('time', ''),
            latitude=data.get('location', {}).get('latitude', ''),
            longitude=data.get('location', {}).get('longitude', ''),
            location='Dynamic location',
            detection_time=data.get('time', ''),
            detection_id=1234,
            alert_count=1,
            animal_type=data.get('detection_type', 'deer')
        )
        db.session.add(new_detection)
        db.session.commit()

        # Send FCM notification after adding detection
        send_fcm_notification()

        return jsonify({"message": "Detection data received and notification sent"}), 200

    return jsonify({"message": "Invalid data"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)