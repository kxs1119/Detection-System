import RPi.GPIO as GPIO
import time

# Setup
GPIO.setmode(GPIO.BCM)  # Use BCM pin numbering
LED_PIN = 18  # GPIO pin connected to the LED
SWITCH_PIN = 17  # GPIO pin connected to the switch

# Set up the GPIO pins
GPIO.setup(LED_PIN, GPIO.OUT)  # Set LED pin as output
GPIO.setup(SWITCH_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)  # Set switch pin as input with pull-up resistor

# Function to clean up GPIO on exit
def cleanup():
    GPIO.cleanup()

try:
    while True:
        switch_state = GPIO.input(SWITCH_PIN)  # Read the state of the switch
        if switch_state == GPIO.LOW:  # Switch pressed (connected to ground)
            GPIO.output(LED_PIN, GPIO.HIGH)  # Turn on the LED
            print("Switch Pressed! LED ON")
        else:
            GPIO.output(LED_PIN, GPIO.LOW)  # Turn off the LED
            print("LED OFF")
        time.sleep(0.1)  # Small delay to debounce button

except KeyboardInterrupt:
    # Clean up GPIO on Ctrl+C
    cleanup()

except Exception as e:
    print(f"An error occurred: {e}")
    cleanup()

finally:
    # Clean up GPIO on normal exit
    cleanup()