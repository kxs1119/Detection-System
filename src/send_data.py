import requests
import json
from datetime import datetime

def send_data():
    """
    Sends deer detection data to the backend server using a POST request.
    """
    # Data payload (replace latitude and longitude with actual data)
    url = 'http://192.168.250.144:8080/api/deer-detection'
    data = {
        "deer_detected": True,
        "location": {
            "latitude": 38.8951,
            "longitude": -77.0364
        },
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
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
    send_data()