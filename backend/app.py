import logging
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.alert_routes import alert_bp
from routes.location_routes import location_bp
from routes.proximity_routes import proximity_bp

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Register blueprints with unique prefixes
app.register_blueprint(alert_bp, url_prefix='/api/alerts')
app.register_blueprint(location_bp, url_prefix='/api/location')
app.register_blueprint(proximity_bp, url_prefix='/api/proximity')

@app.route('/test', methods=['GET'])
def test():
    return {"message": "Test route working!"}, 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)