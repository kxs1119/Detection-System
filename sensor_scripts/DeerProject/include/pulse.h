#ifndef PULSE_H
#define PULSE_H

#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include "../lib/pigpio-master/pigpio.h"

void startPulse(int TRIG, int pulseLen);

void echoHandler(int ECHO, int level, uint32_t tick);

void watchEcho(int ECHO);

#endif //PULSE_H
