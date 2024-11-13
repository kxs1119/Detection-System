from flask import Flask, request, jsonify
from flask_cors import CORS
from ariadne import graphql_sync
from . import create_app, db
from .schema import schema  # Import the GraphQL schema
from .models import Alert  # Import the Alert model

app = create_app()
CORS(app)

# Only the POST route for handling GraphQL queries
@app.route("/graphql", methods=["POST"])
def graphql_server():
    data = request.get_json()
    app.logger.info(f"GraphQL query received: {data}")  # Log received data for debugging
    success, result = graphql_sync(schema, data, context_value=request, debug=app.debug)
    status_code = 200 if success else 400
    return jsonify(result), status_code

# New GET route to fetch and display all alerts
@app.route("/api/get-alerts", methods=["GET"])
def get_alerts():
    try:
        # Query all alerts from the database
        alerts = Alert.query.all()
        # Format the alerts for JSON response
        alerts_data = [
            {
                "alert_id": alert.alert_id,
                "device_id": alert.device_id,
                "location_id": alert.location_id,
                "alert_type": alert.alert_type,
                "timestamp": alert.timestamp.isoformat(),
                "status": alert.status
            }
            for alert in alerts
        ]
        # Return JSON response with all alerts
        return jsonify({"alerts": alerts_data}), 200
    except Exception as e:
        # Log and return error if there is an issue with the query
        app.logger.error(f"Error retrieving alerts: {e}")
        return jsonify({"error": "An error occurred while retrieving alerts"}), 500

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080, debug=True)
