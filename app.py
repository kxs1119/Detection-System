import logging
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
import os
from dotenv import load_dotenv
from mock import mock_alerts

# Load environment variables
load_dotenv()

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

        return jsonify({"message": "Detection data received and notification sent"}), 200

    return jsonify({"message": "Invalid data"}), 400

# Endpoint to fetch recent or all alerts
@app.route('/alerts', methods=['GET'])
def get_alerts():
    # alerts = Detection.query.all()
    # alert_list = [
    #     {
    #         "id": alert.id,
    #         "device": alert.device,
    #         "time_stamp": alert.time_stamp,
    #         "latitude": alert.latitude,
    #         "longitude": alert.longitude,
    #         "location": alert.location,
    #         "detection_time": alert.detection_time,
    #         "detection_id": alert.detection_id,
    #         "alert_count": alert.alert_count,
    #         "animal_type": alert.animal_type,
    #     }
    #     for alert in alerts
    # ]
    return jsonify(mock_alerts), 200    #TODO: Revise this to alert_list when database is setup

if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)