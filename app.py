import logging
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
import os

# Configure logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
CORS(app)

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

# Endpoint to retrieve the latest detection data from the database
@app.route('/')
def home():
    detection = Detection.query.order_by(Detection.id.desc()).first()
    
    # If no data is available, return a JSON response with a message
    if detection is None:
        return jsonify({"message": "No detection data available yet."}), 200
    
    # Pass the detection data as JSON
    detection_data = {
        'device': detection.device,
        'time_stamp': detection.time_stamp,
        'latitude': detection.latitude,
        'longitude': detection.longitude,
        'location': detection.location,
        'detection_time': detection.detection_time,
        'detection_id': detection.detection_id,
        'alert_count': detection.alert_count,
        'animal_type': detection.animal_type
    }
    return jsonify(detection_data), 200

# API endpoint to receive POST data from send_data.py or Flutter app
@app.route('/api/deer-detection', methods=['POST'])
def deer_detection():
    data = request.json  # Get the JSON data sent from the client

    if data:
        # Create a new detection object and save it to the database
        new_detection = Detection(
            device='Raspberry Pi',
            time_stamp=data.get('time', ''),
            latitude=data.get('location', {}).get('latitude', ''),
            longitude=data.get('location', {}).get('longitude', ''),
            location='Dynamic location',
            detection_time=data.get('time', ''),
            detection_id=1234,  # Replace with dynamic value if necessary
            alert_count=1,  # Replace with dynamic value if needed
            animal_type=data.get('detection_type', 'deer')
        )
        db.session.add(new_detection)
        db.session.commit()

        # Respond with a success message
        return jsonify({"message": "Detection data received and updated successfully"}), 200
    
    return jsonify({"message": "Invalid data"}), 400

# Route to test database connection by querying the first record
@app.route('/test_db', methods=['GET'])
def test_db():
    try:
        detection = Detection.query.first()
        
        if detection is None:
            return jsonify({"message": "No detection data found in the database."}), 200
        else:
            detection_data = {
                'device': detection.device,
                'time_stamp': detection.time_stamp,
                'latitude': detection.latitude,
                'longitude': detection.longitude,
                'location': detection.location,
                'detection_time': detection.detection_time,
                'detection_id': detection.detection_id,
                'alert_count': detection.alert_count,
                'animal_type': detection.animal_type
            }
            return jsonify(detection_data), 200
    except Exception as e:
        logging.error(f"Error during database query: {str(e)}")
        return jsonify({"error": str(e)}), 500

# API endpoint to test inserting a new detection record
@app.route('/api/test-insert', methods=['POST'])
def test_insert():
    try:
        # Create a test detection entry
        new_detection = Detection(
            device='Test Device',
            time_stamp='2024-10-22 15:30:00',
            latitude='51.509865',
            longitude='-0.118092',
            location='Test Location',
            detection_time='2024-10-22 15:30:00',
            detection_id=9999,
            alert_count=0,
            animal_type='test'
        )
        db.session.add(new_detection)
        db.session.commit()
        logging.info("Test detection record inserted successfully.")
        return jsonify({"message": "Test record inserted"}), 200
    except Exception as e:
        logging.error(f"Error inserting test detection record: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Route to query all detection data from the database
@app.route('/get_data', methods=['GET'])
def get_data():
    try:
        data = Detection.query.all()  # Query all records in the Detection table
        result = []
        for d in data:
            result.append({
                'device': d.device,
                'time_stamp': d.time_stamp,
                'latitude': d.latitude,
                'longitude': d.longitude,
                'location': d.location,
                'detection_time': d.detection_time,
                'detection_id': d.detection_id,
                'alert_count': d.alert_count,
                'animal_type': d.animal_type
            })
        return jsonify(result), 200
    except Exception as e:
        logging.error(f"Error retrieving data from database: {str(e)}")
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)