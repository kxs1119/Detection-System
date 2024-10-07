import requests
import json
import sys

def send_data(detection_data):
    """
    Sends deer detection data to the backend server using a POST request.
    """
    # Data payload with the passed detection data
    url = 'http://192.168.250.144:8080/api/deer-detection'  # Update the URL if needed
    data = {
        'time': detection_data['time'],
        'location': {
            'latitude': detection_data['location']['latitude'],
            'longitude': detection_data['location']['longitude']
        },
        'detection_type': detection_data['type']  # Type could be 'deer', etc.
    }
    
    # Send the data to the backend API endpoint
    try:
        response = requests.post(url, json=data)
        response.raise_for_status()  # Raises an HTTPError for bad responses
        print("Data sent successfully!")
    except requests.exceptions.HTTPError as err:
        print(f"HTTP error occurred: {err}")
    except Exception as err:
        print(f"An error occurred: {err}")

if __name__ == "__main__":
    # Check if detection data was passed as a command-line argument
    if len(sys.argv) > 1:
        # Parse the JSON string passed from sensor_check.py
        detection_data = json.loads(sys.argv[1])
        print(f"Received detection data: {detection_data}")
        send_data(detection_data)
    else:
        print("No detection data received.")
