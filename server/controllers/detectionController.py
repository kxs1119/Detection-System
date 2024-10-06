def process_deer_detection(data):
    """
    Processes the deer detection data received from the Raspberry Pi.
    - data: dict containing deer detection information
    """
    try:
        # Extract relevant data from the JSON payload
        deer_detected = data.get('deer_detected', False)
        location = data.get('location', {})
        timestamp = data.get('timestamp', "Unknown")

        if deer_detected:
            latitude = location.get('latitude', 'Unknown')
            longitude = location.get('longitude', 'Unknown')

            # Log or store the detection data (optional database logic can go here)
            print(f"Deer detected at location: {latitude}, {longitude} at {timestamp}")
            
            # Example: Call a function to trigger an alert (SMS, push notification, etc.)
            # trigger_alert(latitude, longitude, timestamp)

            return {"status": "Deer detection processed successfully"}
        else:
            return {"status": "No deer detected"}
    
    except Exception as e:
        print(f"Error processing deer detection: {e}")
        return {"status": "Error processing deer detection", "error": str(e)}