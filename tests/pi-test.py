import RPi.GPIO as GPIO
import time

# Setup
GPIO.setmode(GPIO.BCM)  # Use BCM pin numbering
LED_PIN = 16  # GPIO pin connected to the LED
CAMERA = 25

# Set up the GPIO pins
GPIO.setup(LED_PIN, GPIO.OUT)  # Set LED pin as output
GPIO.output(LED_PIN,GPIO.HIGH)
time.sleep(5)
GPIO.output(LED_PIN,GPIO.LOW)
GPIO.cleanup()