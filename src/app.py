import logging
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Mock data file path
mock_data_file = './DeerSafeApp/src/mocks/mock_data.json'

# Ensure mock data file exists
if not os.path.exists(mock_data_file):
    with open(mock_data_file, 'w') as file:
        json.dump([], file)

# Endpoint to handle detection data and return alerts
@app.route('/api/alerts', methods=['POST'])
def handle_alerts():
    # Retrieve JSON data from request
    data = request.json

    # Check if 'location' is a string or a dictionary
    location_data = data.get('location')
    if isinstance(location_data, str):
        location_name = location_data
        latitude = data.get('latitude', 34.0522)  # Fallback to default
        longitude = data.get('longitude', -118.2437)  # Fallback to default
    elif isinstance(location_data, dict):
        location_name = location_data.get('name', "Unknown Location")
        latitude = location_data.get('latitude', 34.0522)
        longitude = location_data.get('longitude', -118.2437)
    else:
        location_name = "Unknown Location"
        latitude = 34.0522
        longitude = -118.2437

    # Create alert data
    alert_data = {
        "id": data.get('id', 1),
        "device": data.get('device', "Raspberry Pi"),
        "time_stamp": data.get('time_stamp', "2024-10-31T15:45:00Z"),
        "latitude": latitude,
        "longitude": longitude,
        "location": location_name,
        "detection_time": data.get('detection_time', "2024-10-31T15:45:00Z"),
        "detection_id": data.get('detection_id', 5678),
        "animal_type": data.get('animal_type', 'Deer'),
        "alert_count": data.get('alert_count', 2),
        "title": data.get('animal_type', "Deer"),
        "description": data.get('description', 'No description provided')
    }

    # Append alert data to mock_data.json file
    try:
        with open(mock_data_file, 'r+') as file:
            # Load existing data
            file_data = json.load(file)
            # Append new alert
            file_data.append(alert_data)
            # Move the pointer to the beginning of the file before writing
            file.seek(0)
            json.dump(file_data, file, indent=4)
        logging.info("Alert appended to mock data file")
    except Exception as e:
        logging.error(f"Error appending to mock data file: {e}")
        return jsonify({"error": "Failed to write data"}), 500

    # Return all alerts after updating the file
    try:
        with open(mock_data_file, 'r') as file:
            mock_alerts = json.load(file)
        return jsonify({"message": "Detection data received and appended", "alerts": mock_alerts}), 200
    except Exception as e:
        logging.error(f"Error reading mock data file: {e}")
        return jsonify({"error": "Failed to retrieve alerts"}), 500


@app.route('/test', methods=['GET'])
def test():
    return jsonify({"message": "Test route working!"}), 200


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True, use_reloader=True)
