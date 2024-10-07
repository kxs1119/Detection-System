from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize detection data as None to be populated later
detection_data = None

@app.route('/')
def home():
    global detection_data
    
    # If no data is available, return a message
    if detection_data is None:
        return render_template('index.html', message="No detection data available yet.")
    
    # Pass the detection data dynamically to the template when available
    return render_template('index.html', **detection_data)

# API endpoint to receive POST data from send_data.py
@app.route('/api/deer-detection', methods=['POST'])
def deer_detection():
    global detection_data
    data = request.json  # Get the JSON data sent from send_data.py

    if data:
        # Dynamically populate detection_data with the received data
        detection_data = {
            'device': 'Raspberry Pi',
            'time_stamp': data.get('time', ''),
            'latitude': data.get('location', {}).get('latitude', ''),
            'longitude': data.get('location', {}).get('longitude', ''),
            'location': 'Dynamic location',  
            'detection_time': data.get('time', ''),
            'detection_id': 1234,  
            'alert_count': 1,  
            'animal_type': data.get('detection_type', 'deer')
        }

        # Respond with a success message
        return jsonify({"message": "Detection data received and updated successfully"}), 200
    return jsonify({"message": "Invalid data"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)