from gpiozero import MotionSensor,LED
from time import sleep


# Setup
# GPIO.setmode(GPIO.BCM)  # Use BCM pin numbering
led = LED(16,active_high=True)        # GPIO pin connected to the LED
motion = MotionSensor(18)            # GPIO pin connected to the Camera

led.off()

print("Waiting")
# motion.wait_for_no_motion()
# sleep(5)

# TODO: 

while True:
    print("ready")
    if motion.wait_for_motion():
        print("Motion detected! Turning LED on for 5 seconds...")
        led.on()
        sleep(5)
        led.off()
        
        print("LED turned off after 5 seconds...")
        break
    
#     print("Motion detected")
#     led.on()
#     sleep(3)
#     led.off()

# for
