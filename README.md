
# Deer Detection System
---
The **Deer Detection System** is a mobile-friendly application designed to detect animals, such as deer, approaching roads or highways. It gathers geospatial data from sensors, processes it via a Flask backend, and categorizes alerts based on recency for user review. The system also leverages GraphQL for efficient data querying and Supabase for notifications.

## Features

- **Sensor Data Submission**: The system collects and sends animal-detection sensor data to the backend, capturing the location and time of sightings.
- **GraphQL for Efficient Data Management**: GraphQL optimizes data queries, reducing API calls and enhancing the app's efficiency for fetching detailed sighting records.
- **Proximity-Based Alerts**: Alerts are categorized by proximity:
  - **New Alerts**: Sightings detected within the last 2 hours.
  - **Recent Alerts**: Sightings from over 2 hours ago but still relevant for review.
- **Push Notifications**: Using Supabase, the system provides in-app post notifications and push notifications for proximity alerts. These notifications appear both within and outside the app.
- **Details Form**: Users can submit sighting details (animal type, date/time, location) to ensure accuracy and improve data collection.
- **Future Features**:
  - **Map Integration**: Planned to display animal sighting locations on a map interface, allowing users to view real-time and historical sighting data visually.
  - **Desktop Compatibility**: A future goal is to extend the application for desktop use, ensuring seamless access across devices.
