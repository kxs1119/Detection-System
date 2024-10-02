import RPi.GPIO as GPIO
import time

# Setup
GPIO.setmode(GPIO.BCM)  # Use BCM pin numbering
LED_PIN = 19  # GPIO pin connected to the LED

# Set up the GPIO pins
GPIO.setup(LED_PIN, GPIO.OUT)  # Set LED pin as output
GPIO.output(LED_PIN,GPIO.HIGH)
time.sleep(520)
GPIO.output(LED_PIN,GPIO.LOW)
GPIO.cleanup()