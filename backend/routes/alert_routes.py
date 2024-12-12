from flask import Blueprint, request, jsonify
from services.alert_services import process_alert
import json

alert_bp = Blueprint('alerts', __name__)

@alert_bp.route('/', methods=['POST'])
def handle_alerts():
    data = request.json
    # Process the alert
    alert_data = process_alert(data)
    
    if alert_data:
        return jsonify({"message": "Alert processed successfully", "data": alert_data}), 200
    else:
        return jsonify({"message": "No alerts to process"}), 200