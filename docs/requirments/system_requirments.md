# System Requirements

## 1. Hardware Requirements
- **Raspberry Pi Model**: Raspberry Pi 4 (or 3B+ for lower budget)
  - **CPU**: Quad-core ARM Cortex-A72
  - **RAM**: 2GB (minimum), 4GB recommended for better performance
  - **Storage**: 16GB microSD card (minimum), 32GB recommended
  - **Connectivity**: Wi-Fi or Ethernet for internet/cloud access
- **Power Supply**: 5V 3A USB-C power supply for Raspberry Pi
- **Sensors**:
  - **PIR Motion Sensor**: e.g., HC-SR501 (for detecting animal movement)
- **Alerting Device**: Smartphone via DeerSafe 

## 2. Software Requirements
- **Operating System**: Raspberry Pi OS (32-bit recommended, based on Debian)
- **Programming Language**:
  - **Python 3** (preferred for sensor integration and 
- **Required Python Libraries**:
  -  `gpiozero` (for sensor control)
  - `requests` (for sending data to cloud services or APIs)
- **Software**:
  - **Geofencing**: PostGIS or cloud-based geolocation service (if using cloud)

## 3. Functional Requirements
- **Animal Detection**: The system must accurately detect animals approaching the highway using sensors (PIR/Ultrasonic).
- **Geofencing Logic**: The system must trigger an alert when an animal is detected within a predefined geofenced area.
- **Alert System**: The system must send a real-time alert via SMS or GPS to nearby users.
- **Local Processing**: Must process data locally on the Raspberry Pi to reduce latency in detecting animals and triggering alerts.
- **Cloud Connectivity** (optional): Send animal detection data to the cloud for remote monitoring and logging.

## 4. Non-functional Requirements
- **Real-Time Performance**: The system must process sensor data and send alerts within 1-2 seconds of detecting an animal.
- **Scalability**: The system should be able to handle multiple sensors if required.
- **Power Efficiency**: Power supply should be stable for outdoor deployment.
- **Environmental Durability**: Sensors and the Raspberry Pi should be housed in weather-resistant enclosures for outdoor use.
