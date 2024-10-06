import time

# Mock GPIO setup
class MockGPIO:
    HIGH = 1
    LOW = 0
    BCM = 0

    def __init__(self):
        self.pins = {}

    def setmode(self, mode):
        pass  # No action needed for mock

    def setup(self, pin, direction, pull_up_down=None):
        self.pins[pin] = self.HIGH  # Set default HIGH for input pins

    def output(self, pin, state):
        self.pins[pin] = state
        if state == self.HIGH:
            print(f"LED ON")
        else:
            print(f"LED OFF")

    def input(self, pin):
        return self.pins.get(pin, self.HIGH)  # Return the current state of the pin

    def cleanup(self):
        pass  # No action needed for mock

# Replace RPi.GPIO with MockGPIO
GPIO = MockGPIO()

# Setup
LED_PIN = 18  # Mock GPIO pin connected to the LED
SWITCH_PIN = 17  # Mock GPIO pin connected to the switch (GND setup)

# Set up the GPIO pins
GPIO.setup(LED_PIN, 'OUT')  # Set LED pin as output
GPIO.setup(SWITCH_PIN, 'IN')  # Set switch pin as input

# Mock Test Function
def mock_test():
    print("Starting mock test...")

    # Simulate button presses
    for i in range(5):  # Simulate 5 button presses
        print(f"Mock Press #{i + 1}:")
        GPIO.pins[SWITCH_PIN] = GPIO.LOW  # Simulate switch being pressed
        GPIO.output(LED_PIN, GPIO.HIGH)  # Turn on the LED
        time.sleep(1)  # Keep it on for 1 second

        GPIO.pins[SWITCH_PIN] = GPIO.HIGH  # Simulate switch being released
        GPIO.output(LED_PIN, GPIO.LOW)  # Turn off the LED
        time.sleep(1)  # Keep it off for 1 second

    print("Mock test completed.")

# Run the mock test
if __name__ == "__main__":
    mock_test()