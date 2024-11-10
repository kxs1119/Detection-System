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

# Endpoint to handle detection data and return alerts
@app.route('/api/deer-detection', methods=['POST'])
def handle_detection_and_get_alerts():
    # Retrieve JSON data from request
    data = request.json
    
    # Extract fields or set default values
    detection_data = {
        "id": data.get('id', 3),
        "device": data.get('device', "Raspberry Pi"),
        "time_stamp": data.get('time_stamp', "2024-10-31T15:45:00Z"),
        "latitude": data.get('location', {}).get('latitude', "34.0522"),
        "longitude": data.get('location', {}).get('longitude', "-118.2437"),
        "location": data.get('location', {}).get('name', "SRU"),
        "detection_time": data.get('detection_time', "2024-10-31T15:45:00Z"),
        "detection_id": data.get('detection_id', 5678),
        "alert_count": data.get('alert_count', 2),
        "animal_type": data.get('animal_type', "Deer")
    }

    # Append detection data to mock_data.json file
    try:
        with open(mock_data_file, 'r+') as file:
            # Load existing data
            file_data = json.load(file)
            # Append new detection
            file_data.append(detection_data)
            # Move the pointer to the beginning of the file before writing
            file.seek(0)
            json.dump(file_data, file, indent=4)
        logging.info("Alert appended to mock data file")
    except FileNotFoundError:
        logging.error(f"Mock data file not found at {mock_data_file}")
        return jsonify({"error": "Mock data file not found"}), 500
    except Exception as e:
        logging.error(f"Error appending to mock data file: {e}")
        return jsonify({"error": "Failed to write data"}), 500

    # Return all alerts after updating the file
    try:
        with open(mock_data_file, 'r') as file:
            mock_alerts = json.load(file)
        return jsonify({"message": "Detection data received and appended", "alerts": mock_alerts}), 200
    except FileNotFoundError:
        logging.error("Mock data file not found when retrieving alerts")
        return jsonify({"error": "Mock data file not found"}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=False, use_reloader=False)
