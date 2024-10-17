from flask import Blueprint, request, jsonify
from geopy.distance import geodesic

api_bp = Blueprint('api', __name__)

REAL_TIME_THRESHOLD_KM = 10.0  # Example threshold

@api_bp.route('/deer-detection', methods=['POST'])
def deer_detection():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data received"}), 400

        # Extract the location from the incoming data
        incoming_location = data.get('location', {})
        latitude = incoming_location.get('latitude')
        longitude = incoming_location.get('longitude')

        if not latitude or not longitude:
            return jsonify({"error": "Invalid location data"}), 400

        # Dynamically get the Flutter app's location from the JSON request
        flutter_location = data.get('flutter_location', {})
        flutter_latitude = flutter_location.get('latitude')
        flutter_longitude = flutter_location.get('longitude')

        if not flutter_latitude or not flutter_longitude:
            return jsonify({"error": "Invalid Flutter location data"}), 400

        # Calculate the distance between the incoming location and the Flutter location
        distance = geodesic((latitude, longitude), (flutter_latitude, flutter_longitude)).kilometers

        # If the distance is less than the threshold, process as real-time data
        if distance <= REAL_TIME_THRESHOLD_KM:
            return jsonify({"status": "success", "message": "Real-time data processed"}), 200

        # Otherwise, store in the database (Placeholder for future implementation)
        else:
            print(f"Storing data in the database, distance = {distance} km")
            return jsonify({"status": "success", "message": "Data stored in the database"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500
