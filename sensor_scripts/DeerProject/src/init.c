#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include "../lib/pigpio-master/pigpio.h"

// File Includes
#include "read_sensors.h"
#include "pulse.h"
#include "gps.h"

#define GPS 18
#define TRIG 23
#define ECHO 24

int gpioBoot() {
    if (gpioInitialise() < 0) {
        // Init Failed
        printf("Error! GPIO initialization failed.\n");
        gpioTerminate();
        return -1;
    }
    else {
        unsigned GPS_STATE = gpioRead(GPS);
        unsigned TRIG_STATE = gpioRead(TRIG);
		unsigned ECHO_STATE = gpioRead(ECHO);

        // Check GPIO state
        if (GPS_STATE == PI_BAD_GPIO || TRIG_STATE == PI_BAD_GPIO || ECHO_STATE == PI_BAD_GPIO) {
            // Error with GPIO
            printf("Error! Unexpected error PI_BAD_GPIO encountered.\n");
            gpioTerminate();
            return -1;
        }

        // Check if the GPIO is powered off and attempt to power it on
        if (GPS_STATE == 0) {
            if (gpioWrite(GPS, 1) != 0) {
                // Error
                printf("Error! Problem encountered when powering on GPS.\n");
                gpioTerminate();
                return -1;
            }
			else {
				printf("Successfully powered on GPS.\n");
			}
        }

		// Set sensors to their respective modes
		GPS_STATE = gpioSetMode(GPS, PI_INPUT);
		TRIG_STATE = gpioSetMode(TRIG, PI_OUTPUT);
		ECHO_STATE = gpioSetMode(ECHO, PI_INPUT);

		if (GPS_STATE == PI_BAD_MODE || GPS_STATE == PI_BAD_GPIO) {
			printf("Error! Problem encountered when setting sensor mode on GPS.\n");
			return -1;
		}
		else {
			printf("GPS mode set to input.\n");
		}

		if (TRIG_STATE == PI_BAD_MODE || TRIG_STATE == PI_BAD_GPIO) {
			printf("Error! Problem encountered when setting sensor mode on TRIG.\n");
			return -1;
		}
		else {
			printf("TRIG mode set to output.\n");
		}

		if (ECHO_STATE == PI_BAD_MODE || ECHO_STATE == PI_BAD_GPIO) {
			printf("Error! Problem encounterd when setting sensor mode on ECHO.\n");
			return -1;
		}
		else {
			printf("ECHO mode set to input.\n");
		}

		TRIG_STATE = gpioRead(TRIG);
		ECHO_STATE = gpioRead(ECHO);

		if (TRIG_STATE != 0) {
			gpioWrite(TRIG, 0);
			printf("Powering down TRIG to let sensor settle...\n");
			sleep(1);
		}

		if (ECHO_STATE != 0) {
			gpioWrite(ECHO, 0);
			printf("Powering down ECHO to let sensor settle...\n");
			sleep(1);
		}
	}

    return 1;
}

int main(int argc, char *argv[]) {
    if (gpioBoot() == -1) {
        return -1;
    }
    else {
        printf("\nSuccessfully initialized GPIO devices.\n");
    }

	// Initialize sensors
	sleep(1);
	sensorHandler(GPS, TRIG, ECHO);	
	sleep(1);

	// Open serial device
	char *dev = "/dev/ttyACM0";
	unsigned handle = openSerial(dev, 9600);

	if (handle == - 1) {
		return -1;
	}

	// Set up callback function for echo
	watchEcho(ECHO);
	sleep(1);

	// Read from serial device
	char buff[1024];
	unsigned numBytes, bytesRead;

	while (1) {
		numBytes = serDataAvailable(handle);

		if (numBytes > 0) {
			bytesRead = readSerial(handle, buff, sizeof(buff));
			buff[bytesRead] = '\0';
			printf("Received: %s\n", buff);
			usleep(1000);

			char *result = strstr(buff, "$GPGGA");

			if (result) {
				printf("$GPGGA found at position: %d\n", result - buff);
				int index = result - buff;

				while (buff[index] != '\n') {
					printf("%c", buff[index]);
					index++;
				}
				printf("\n");
			}
		}
	}

	sleep(3);

	// Send pulses from ultrasonic sensor
	startPulse(TRIG, 10000);

	// Power Down
	printf("Powering down...\n");

    // Temporary Power Down Functions
	gpioWrite(GPS, 0);
	gpioWrite(TRIG, 0);
	gpioWrite(ECHO, 0);
    gpioTerminate();
    return 0;
}

