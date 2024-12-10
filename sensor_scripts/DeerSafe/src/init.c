#include <stdio.h>
#include "../lib/pigpio-master/pigpio.h"

// File Includes
#include "read_sensors.c"

#define GPS 18
#define MOTION 23

int gpioBoot() {
    if (gpioInitialise() < 0) {
        // Init Failed
        printf("Error! GPIO initialization failed.\n");
        gpioTerminate();
        return -1;
    }
    else {
        const unsigned GPS_STATE = gpioRead(GPS);
        const unsigned MOTION_STATE = gpioRead(GPS);

        // Check GPIO level
        if (GPS_STATE == PI_BAD_GPIO || MOTION_STATE == PI_BAD_GPIO) {
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
        }

        if (MOTION_STATE == 0) {
            if (gpioWrite(MOTION, 1) != 0) {
                // Error
                printf("Error! Problem encountered when powering on MOTION.\n");
                gpioTerminate();
                return -1;
            }
        }

    }

    return 1;
}

int main(int argc, char *argv[]) {
    if (gpioBoot() == -1) {
        return -1;
    }
    else {
        printf("Successfuly initialized GPIO devices.\n");
    }

    // Temporary Power Down Functions
    gpioSetWatchdog(GPS, 0);
    gpioSetWatchdog(MOTION, 0);
    gpioTerminate();
    return 0;
}