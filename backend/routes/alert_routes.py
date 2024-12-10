from flask import Blueprint, request, jsonify
from services.alert_services import process_alert

alert_bp = Blueprint('alerts', __name__)

@alert_bp.route('/alerts', methods=['POST'])
def handle_alerts():
    data = request.json

    try:
        # Process the alert data
        alert_data = process_alert(data)
        return jsonify({"message": "Detection data received and appended", "alerts": alert_data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500