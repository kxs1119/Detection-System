import logging
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from routes.alert_routes import alert_bp

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Register blueprints
app.register_blueprint(alert_bp, url_prefix='/api')

@app.route('/test', methods=['GET'])
def test():
    return {"message": "Test route working!"}, 200

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)