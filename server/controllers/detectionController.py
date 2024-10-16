from flask import Blueprint, request, jsonify

detection_bp = Blueprint('detection', __name__)
latest_sensor_data = None  # Global to hold latest sensor data

@detection_bp.route('/sensor', methods=['POST'])
def receive_sensor_data():
    global latest_sensor_data
    try:
        sensor_data = request.get_json()
        # Process the data directly here
        deer_detected = sensor_data.get('type', '') == 'motion'
        location = sensor_data.get('location', {})
        latitude = location.get('latitude', None)
        longitude = location.get('longitude', None)
        timestamp = sensor_data.get('time', None)

        if deer_detected and latitude and longitude:
            latest_sensor_data = sensor_data  # Store latest data for real-time access
            print(f"Deer detected at lat {latitude}, long {longitude} at {timestamp}")
            return jsonify({"status": "success", "message": "Real-time data processed"}), 200
        else:
            return jsonify({"status": "error", "message": "Missing or invalid data"}), 400

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@detection_bp.route('/sensor', methods=['GET'])
def get_sensor_data():
    global latest_sensor_data
    if latest_sensor_data:
        return jsonify(latest_sensor_data), 200
    return jsonify({"status": "error", "message": "No sensor data available"}), 404
