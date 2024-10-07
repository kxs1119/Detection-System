from flask import Flask,render_template
from flask_cors import CORS
from server.routes.api import api_bp # Import API bluepring

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    # Dynamic content initated
    context = {
        'device': 'Raspberry Pi',
        'time_stamp': '13:00 PM',
        'latitude': 31.043,
        'longitude': -34.541,
        'map': "map here",
        'location': 'Slippery Rock University',
        'detection_time': '12:59 PM',
        'detection_id': 1234,
        'alert_count': 1,
        'animal_type': 'deer'
    }
    
    return render_template('index.html', **context)

# Register the API blueprint with the URL prefix '/api'
app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080,debug=True) 