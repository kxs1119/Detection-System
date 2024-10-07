
def process_deer_detection(data):
    """
    Function to process deer detection data sent from the Raspberry Pi.
    - data: dict containing the detection info.
    """
    try:
        # Extract necessary fields from the incoming data
        deer_detected = data.get('deer_detected', False)
        location = data.get('location', {})
        latitude = location.get('latitude', None)
        longitude = location.get('longitude', None)
        timestamp = data.get('timestamp', None)

        # Check if the necessary data is present
        if deer_detected and latitude and longitude:
            # Log or store the detection data (placeholder)
            print(f"Deer detected at lat {latitude}, long {longitude} at {timestamp}")
            # Additional processing like storing in a database can go here
            return {"status": "success", "message": "Deer detection processed successfully"}
        else:
            return {"status": "error", "message": "Missing or invalid data"}

    except Exception as e:
        print(f"Error processing detection: {e}")
        return {"status": "error", "message": str(e)}