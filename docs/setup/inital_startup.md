# DeerSafe Setup Guide

This guide provides a comprehensive step-by-step process for setting up the **DeerSafe** project, including configuring the Raspberry Pi, setting up the database, integrating sensors, running the application, testing with Postman, and using Expo Go for mobile testing.

---

## **1. Raspberry Pi Setup**

### **Step 1: Install Raspberry Pi OS**
1. Download the Raspberry Pi Imager:
   - [Download here](https://www.raspberrypi.com/software/).
2. Flash the OS to an SD card:
   - Choose Raspberry Pi OS (Lite or Desktop) and configure Wi-Fi and SSH under `Advanced Options`.
3. Insert the SD card into your Raspberry Pi and boot it up.

---

### **Step 2: Configure Raspberry Pi**
1. Update the system:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
2. Install required tools:
   ```bash
   sudo apt install python3 python3-pip gpsd gpsd-clients python3-gps git -y
   ```

---

### **Step 3: Clone the Repository**
1. Clone the repository to the Raspberry Pi:
   ```bash
   git clone https://github.com/kxs1119/Detection-System.git
   cd Detection-System
   ```

---

## **2. Database Setup (optional if using synthetic data for development)**

### **Step 1: Install PostgreSQL**
1. Install PostgreSQL:
   ```bash
   sudo apt install postgresql postgresql-contrib -y
   ```
2. Start the PostgreSQL service:
   ```bash
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   ```

### **Step 2: Configure the Database**
1. Switch to the PostgreSQL user:
   ```bash
   sudo -i -u postgres
   ```
2. Create the DeerSafe database:
   ```sql
   psql
   CREATE DATABASE deersafe;
   CREATE USER deersafe_user WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE deersafe TO deersafe_user;
   \q
   exit
   ```

3. Apply database schema:
   ```bash
   psql -U deersafe_user -d deersafe -f Detection-System/backend/schema.sql
   ```

---

## **3. Application Setup**

### **Step 1: Install Backend Dependencies**
1. Navigate to the backend directory:
   ```bash
   cd Detection-System/backend
   ```
2. Run virtual environment:
   ```bash
   source env/bin/activate
   pip install -r requirements.txt
   ```

---

### **Step 2: Install Frontend Dependencies**
1. Navigate to the frontend directory:
   ```bash
   cd Detection-System/DeerSafeApp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## **4. Sensor Setup**

### **Step 1: Connect the GPS Sensor**
1. Wire the GPS module to the Raspberry Pi using a breadboard:
   - **GPS TX** → **Raspberry Pi GPIO RX (Pin 10)**.
   - **GPS RX** → **Raspberry Pi GPIO TX (Pin 8)**.
   - **GPS VCC** → **Raspberry Pi 5V (Pin 2)**.
   - **GPS GND** → **Raspberry Pi GND (Pin 6)**.

2. Verify connections:
   - Use a multimeter to check continuity for proper wiring.

---

### **Step 2: Running Sensor Scripts**
1. Navigate to the `sensor_script` directory:
   ```bash
   cd Detection-System/sensor_script
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the GPS handler script:
   ```bash
   python3 gps_handler.py
   ```

---

## **5. Starting the Application**

### **Step 1: Start the Flask Backend**
1. Navigate to the backend directory:
   ```bash
   cd Detection-System/backend
   source env/bin/activate
   ```
2. Start the Flask server:
   ```bash
   flask run --host=0.0.0.0 --port=8080
   ```

---

### **Step 2: Start the Frontend**
1. Navigate to the frontend directory:
   ```bash
   cd Detection-System/DeerSafeApp
   ```
2. Start the React Native application:
   ```bash
   npm start
   ```

---

## **6. Expo Go Mobile Setup**

### **Step 1: Install Expo Go on Mobile**
1. Download **Expo Go** from your mobile device’s app store:
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [Apple App Store](https://apps.apple.com/app/expo-go/id982107779).

---

### **Step 2: Connect Mobile and Raspberry Pi**
1. Ensure your mobile device and Raspberry Pi are on the same Wi-Fi network.
2. Start the React Native application on your Raspberry Pi:
   ```bash
   npm start
   ```

---

### **Step 3: Scan the QR Code**
1. Once the React Native application starts, a QR code will be displayed in your terminal or browser.
2. Open the **Expo Go** app on your mobile device.
3. Scan the QR code to load the application on your mobile.

---

### **Step 4: Test the Application**
1. Test GPS and alerts directly from the mobile app.
2. Interact with the application and ensure the following:
   - User location updates on the map.
   - Alerts display correctly based on proximity.

---

## **7. Testing the Application with Postman**

### **Step 1: Test the Backend Endpoints**
1. Open Postman and create a new POST request.
2. Use the following URLs:
   - **To test location data**:
     ```plaintext
     POST http://127.0.0.1:8080/api/location
     ```
     Body (JSON):
     ```json
     {
       "latitude": 41.301943,
       "longitude": -79.890538
     }
     ```

   - **To test proximity alerts**:
     ```plaintext
     POST http://127.0.0.1:8080/api/proximity
     ```
     Body (JSON):
     ```json
     {
       "latitude": 41.301943,
       "longitude": -79.890538
     }
     ```

   - **To test alert processing**:
     ```plaintext
     POST http://127.0.0.1:8080/api/alerts
     ```
     Body (JSON):
     ```json
     {
       "id": 1,
       "device": "ESP32-CAM-01",
       "time_stamp": "2024-10-31T15:45:00Z",
       "latitude": 41.301943,
       "longitude": -79.890538,
       "location": "Route 27",
       "animal_type": "Deer",
       "alert_count": 1,
       "description": "Single deer detected crossing the road"
     }
     ```

### **Step 2: Verify Responses**
- Check that the backend returns appropriate success responses.
- Ensure that the database updates reflect the sent data.

---

## **8. Troubleshooting**

### Common Issues:
1. **Backend not reachable**:
   - Ensure the Flask server is running and accessible via the specified port.
   - Verify the Raspberry Pi's IP address.

2. **No GPS data**:
   - Check the GPS sensor connections.
   - Run the test script:
     ```bash
     python3 gps_handler.py
     ```

3. **Frontend not working**:
   - Ensure all dependencies are installed.
   - Restart the React Native application:
     ```bash
     npm start
     ```

4. **Mobile app not loading**:
   - Verify that the mobile device and Raspberry Pi are on the same Wi-Fi network.
   - Restart the Expo Go app and re-scan the QR code.

---

You are now ready to deploy and test the DeerSafe system! Follow these steps to ensure seamless integration between the Raspberry Pi, GPS sensor, backend, frontend, and mobile application.
