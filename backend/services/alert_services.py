import json
import logging
from utils.file_utils import ensure_file_exists, read_json_file, write_json_file
from services.location_services import process_location
from flask import flash, Blueprint, request

# File to store mock data
mock_data_file = '../DeerSafeApp/src/mocks/mock_data.json'

def process_alert(data):
    # Ensure the mock data file exists
    ensure_file_exists(mock_data_file, [])

    # Handle location data
    location_data = data.get('location', {})
    if isinstance(location_data, dict):
        location_name = location_data.get('name', "Unknown Location")
        latitude = location_data.get('latitude', 34.0522)
        longitude = location_data.get('longitude', -118.2437)
    elif isinstance(location_data, str):
        location_name = location_data
        latitude = data.get('latitude', 34.0522)  # Fallback latitude
        longitude = data.get('longitude', -118.2437)  # Fallback longitude
    else:
        location_name = "Unknown Location"
        latitude = 34.0522
        longitude = -118.2437

    # Simplified alert data
    alert_data = {
        "id": data.get('id', 1),
        "device": data.get('device', "Unknown Device"),
        "timestamp": data.get('time_stamp', "2024-10-31T15:45:00Z"),
        "latitude": latitude,
        "longitude": longitude,
        "location": location_name,
        "description": data.get('description', "No description provided"),
    }

    try:
        alerts = read_json_file(mock_data_file)
        alerts.append(alert_data)
        write_json_file(mock_data_file, alerts)
        logging.info("Alert appended to mock data file")
    except Exception as e:
        logging.error(f"Failed to process alert: {e}")
        raise e

    return alerts


alert_bp = Blueprint('alerts', __name__)

@alert_bp.route('/displayAlert', methods=['POST'])
def displayAlert():
    location = request.json
    flash(f"Deer Detected {location['distance']}km away!", 'info')
    
    return 200 