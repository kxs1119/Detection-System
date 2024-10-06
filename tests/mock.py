from unittest.mock import Mock, patch
from time import sleep

# Patching gpiozero classes with Mock objects
with patch('gpiozero.MotionSensor') as MockMotionSensor, \
     patch('gpiozero.LED') as MockLED:

    # Create mock instances
    led = MockLED(16, active_high=True)  # Mocked LED
    motion = MockMotionSensor(18)        # Mocked MotionSensor
    
    # Setup mock behavior
    led.on = Mock()
    led.off = Mock()
    motion.wait_for_motion = Mock(side_effect=[True, False, True])  # Simulate motion detected and not detected

    try:
        led.off()  # Ensure LED starts off
        print("Waiting")

        while True:
            print("ready")
            if motion.wait_for_motion():
                print("Motion detected! Turning LED on for 5 seconds...")
                led.on()
                sleep(5)
                led.off()
                print("LED turned off after 5 seconds...")
            else:
                break  # Exit after testing two motion events
    except KeyboardInterrupt:
        print("Print terminated")
    finally:
        led.off()
        print("Cleaned up resources and exited.")

    # Assertions for testing
    led.on.assert_called()         # Check that LED turned on
    led.off.assert_called()        # Check that LED turned off
    motion.wait_for_motion.assert_called()  # Ensure motion detection was simulated