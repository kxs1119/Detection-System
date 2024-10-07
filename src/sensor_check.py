from gpiozero import MotionSensor
import os
import time
import json

# Set up the motion sensor on GPIO pin 18
pir = MotionSensor(18)

def detect_deer():
    """
    Continuously monitors the motion sensor for deer detection.
    Triggers the send_data.py script with detection data when a deer is detected.
    """
    try:
        print("Monitoring for deer...")
        while True:
            pir.wait_for_motion()
            print("Deer detected!")
            
            # Gather detection data (time of detection)
            detection_data = {
                "time": time.strftime("%Y-%m-%d %H:%M:%S"),
                "type": "deer"  # You can expand this if you detect other animals
            }
            
            # Pass the detection data as an argument to send_data.py
            os.system(f'python ./src/send_data.py \'{json.dumps(detection_data)}\'')
            
            # Wait a few seconds before the next detection (to prevent rapid triggers)
            time.sleep(5)
    except KeyboardInterrupt:
        print("Monitoring stopped.")

if __name__ == "__main__":
    detect_deer()
