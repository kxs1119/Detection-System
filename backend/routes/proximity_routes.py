from flask import Blueprint, request, jsonify
from services.location_services import process_location

proximity_bp = Blueprint('proximity', __name__)

@proximity_bp.route('/', methods=['POST'])  # Proximity-specific route
def handle_proximity():
    try:
        data = request.json
        processed_location = process_location(data)
        return jsonify({"message": "Proximity check completed", "data": processed_location}), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "An error occurred during proximity check"}), 500