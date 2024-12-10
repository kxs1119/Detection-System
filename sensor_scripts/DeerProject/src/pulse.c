#include "pulse.h"

void startPulse(int TRIG, int pulseLen) {
	printf("\nBeginning ultrasonic pulses, enter -1 to exit at anytime.\n");

	while (1) {
	    gpioWrite(TRIG, 0);
	    usleep(1);
	    gpioWrite(TRIG, 1);
	    usleep(10);
	    gpioWrite(TRIG, 0);
	}
}

void echoHandler(int ECHO, int level, uint32_t tick) {
    if (level != 1) { return; }

    uint32_t pulse_start = tick;
    uint32_t pulse_end;

    while (gpioRead(ECHO) == 1) {}
    pulse_end = gpioTick();

    uint32_t tickDifference = pulse_end - pulse_start;
    printf("Tick difference: %u\n", tickDifference);

    float distance_cm = ((tickDifference / 29) / 2);
    printf("Distance: %.4f cm\n", distance_cm);
}

void watchEcho(int ECHO) {
    gpioSetAlertFunc(ECHO, echoHandler);
}
