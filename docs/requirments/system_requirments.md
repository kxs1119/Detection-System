# System Requirements

## 1. Hardware Requirements
- **Raspberry Pi Model**: Raspberry Pi 4 (or 3B+ for lower budget)
  - **CPU**: Quad-core ARM Cortex-A72
  - **RAM**: 2GB (minimum), 4GB recommended for better performance
  - **Storage**: 16GB microSD card (minimum), 32GB recommended
  - **Connectivity**: Wi-Fi or Ethernet for internet/cloud access
- **Power Supply**: 5V 3A USB-C power supply for Raspberry Pi
- **Sensors**:
  - **GPS Sensor**: 
- **Alerting Device**: Smartphone via DeerSafe mobile application

## 2. Software Requirements
- **Operating System**: Raspberry Pi OS (32-bit recommended, based on Debian)
- **Programming Language**:
  - **Python 3** : preferred for sensor integration
    - **Python Required Libraries**
      - Flask
      - SQLAlchemy
      - jsonify
      - request
  - **Typescript**: Used to compile the mobile application

## 3. Functional Requirements
- **Animal Detection**: The system must accurately detect animals approaching the highway using sensors (PIR/GPS).
- **Geospatial data**: The alert will trigger when set near a highway surronding datapoints (longitude/latitude)
- **Alert System**: The system must send a real-time alert via Alerts within app to nearby users.
- **Local Processing**: Must process data locally on the Raspberry Pi to reduce latency in detecting animals and triggering alerts.
- **Cloud Connectivity** (optional): Send animal detection data to the cloud for remote monitoring and logging.

## 4. Non-functional Requirements
- **Real-Time Performance**: The system must process sensor data and send alerts within 1-2 seconds of detecting an animal.
- **Scalability**: The system should be able to handle multiple sensors if required.
- **Power Efficiency**: Power supply should be stable for outdoor deployment.
- **Environmental Durability**: Sensors and the Raspberry Pi should be housed in weather-resistant enclosures for outdoor use.
