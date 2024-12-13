from flask import Blueprint, request, jsonify
from services.location_services import process_location

location_bp = Blueprint('location', __name__)

@location_bp.route('/', methods=['POST'])
def handle_locations():
    print("Route accessed")  
    data = request.json
    print("Received data:", data) 
    
    try:
        location_data = process_location(data)
        return jsonify({
            "message": "Location data received", 
            "location": location_data
        }), 200
    except Exception as e:
        print("Error in handle_locations:", str(e)) 
        return jsonify({"error": str(e)}), 500
    
    
def receive_alert():
    pass