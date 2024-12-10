//
// Created by root on 15/11/24.
//

#include "read_sensors.h"
#include "../lib/pigpio-master/pigpio.h"

void sensorHandler(int GPS, int TRIG, int ECHO) {
	printf("GPS has level %d.\n", gpioRead(GPS));
	printf("TRIG has level %d.\n", gpioRead(TRIG));
	printf("ECHO has level %d.\n", gpioRead(ECHO));
}
