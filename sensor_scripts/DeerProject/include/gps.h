#ifndef GPS_H
#define GPS_H

#include <stdio.h>
#include "../lib/pigpio-master/pigpio.h"

unsigned openSerial(char *dev, unsigned serSpeed);

unsigned readSerial(unsigned handle, char *buff, unsigned count);

#endif //GPS_H
