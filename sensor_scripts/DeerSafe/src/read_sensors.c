//
// Created by root on 15/11/24.
//

#include "../lib/pigpio-master/pigpio.h"

void gpsHandler(int GPS, int level, uint32_t tick) {
    printf("GPS has level %d at %d", level, tick);
}

void motionHandler(int MOTION, int level, uint32_t tick) {

}

int sensorHandler(int GPS, int MOTION) {
    // Link functions to be called when sensors activate.
    gpioSetAlertFunc(GPS, gpsHandler);
    gpioSetAlertFunc(MOTION, motionHandler);


    // Set watchdogs on each GPIO sensor to watch their levels
    gpioSetWatchdog(GPS, 10);
    gpioSetWatchdog(MOTION, 5);
}
