from flask import Blueprint, request, jsonify
from server.controllers.detectionController import process_deer_detection

api_bp = Blueprint('api', __name__)

@api_bp.route('/deer-detection', methods=['POST'])
def deer_detection():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data received"}), 400

        response = process_deer_detection(data)
        return jsonify(response), 200
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500