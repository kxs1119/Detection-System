import { getCurrentLocation, sendLocationToBackend } from "../src/services/locationService";
import apiClient from "../src/services/apiClient";  

// Define API base URL for the backend
const API_URL = 'http://127.0.0.1:8080/api';  // Assuming the backend is hosted on localhost

// Function to start the proximity checking interval
function setProxInterval() { 
    setInterval(proximityChecker, 1000); // Check every 10 seconds
}

// Function to check proximity and handle alerts
async function proximityChecker() {
    try {
        // Get the current location of the user
        const location = await getCurrentLocation();

        // Send location data to check if an alert is triggered
        const response = await sendLocationToBackend(location);

        if (response) {
            console.log('Proximity alert triggered:', response);

            // Send the alert response to the backend to process and display the alert
            const alertResponse = await apiClient.post(`${API_URL}/alerts/displayAlert`, response);
            console.log('Alert response from backend:', alertResponse.data);
        } else {
            console.log("Nothing detected within 250m.");
        }
    } catch (error) {
        console.log('Error checking proximity:', error);
        throw error;
    }
}

export default setProxInterval;
