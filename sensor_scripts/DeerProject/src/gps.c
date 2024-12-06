#include "gps.h"

unsigned openSerial(char *dev, unsigned serSpeed) {
    unsigned handle = serOpen(dev, serSpeed, 0);

    if (handle == PI_NO_HANDLE || handle == PI_SER_OPEN_FAILED) {
		printf("Error encountered when opening serial device: %s\n", handle);
		return -1;
    }
    else {
		return handle;
    }
}

unsigned readSerial(unsigned handle, char *buff, unsigned count) {
    unsigned bytesRead = serRead(handle, buff, count);
	printf("Bytes read: %u\n", bytesRead);

    if (bytesRead == PI_SER_READ_NO_DATA || bytesRead == PI_BAD_HANDLE || bytesRead == PI_BAD_PARAM) {
		printf("Error encountered when reading from serial device: %s\n", bytesRead);
		return -1;
    }
    else {
		return bytesRead;
    }
}

