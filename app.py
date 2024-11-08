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
logging.basicConfig(level=logging.DEBUG)

# All database-related configurations and models are commented out as per instructions

# Endpoint to save detection data and write to mock data file
@app.route('/api/deer-detection', methods=['POST'])
def deer_detection():
    data = request.json
    # If no data is provided in the POST request, use a default detection object
    detection_data = data if data else {
        "id": 3,
        "device": "Raspberry Pi",
        "time_stamp": "2024-10-31T15:45:00Z",
        "latitude": "34.0522",
        "longitude": "-118.2437",
        "location": "Baltimore",
        "detection_time": "2024-10-31T15:45:00Z",
        "detection_id": 5678,
        "alert_count": 2,
        "animal_type": "Deer"
    }

    # Append detection data to mock_data.json file
    mock_data_file = 'DeerSafeApp/src/mocks/mock_data.json'
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

    return jsonify({"message": "Detection data received and appended to mock file"}), 200

# Endpoint to fetch recent or all alerts
@app.route('/alerts', methods=['GET'])
def get_alerts():
    # Read and return all data from the mock data file
    try:
        with open('DeerSafeApp/src/mocks/mock_data.json', 'r') as file:
            mock_alerts = json.load(file)
        return jsonify(mock_alerts), 200
    except FileNotFoundError:
        logging.error("Mock data file not found")
        return jsonify({"error": "Mock data file not found"}), 500

if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)
