# DeerSafe Project Documentation

## Overview

The DeerSafe app now includes a refined notification system to provide proximity-based deer alerts. Notifications categorize alerts based on recent activity, displaying them as either "New" (within the last 2 hours) or "Recent Alerts." The system also supports displaying custom images (e.g., deer icon) and time elapsed since the alert was triggered.

## New Dependencies

Ensure the following dependencies are installed for the notification system and image handling:
  
- **@expo/vector-icons**: Used for displaying iconography across the app.
- **expo-font**: Handles custom font loading (add custom fonts if required).
- **axios**: Manages network requests to fetch alerts.
- **expo-notifications** (optional, if external notifications are needed): Manages notifications for push alerts.

Install the dependencies using:
```bash
npm install @expo/vector-icons expo-font axios expo-notifications
```

## Project Structure

Here are the key files and their purpose related to the notification system:

```
├── components/
│   ├── Navbar.tsx                 # Main navigation bar for the app
│   ├── AlertList.tsx              # Component to display alerts in a horizontal scroll view
│   ├── NotificationBanner.tsx     # Displays banner notification for new alerts
│   ├── styles/
│       ├── Homescreen.styles.ts   # Styles for the main home screen layout
│       ├── AlertList.styles.ts    # Styles for the AlertList component
│       ├── NotificationBanner.styles.ts # Styles for the NotificationBanner component
├── src/
│   ├── models/
│       ├── AlertLocation.ts       # Defines structure of an alert
│   ├── services/
│       ├── alertServices.ts       # Fetches alert data from server or mock
│   ├── utils/
│       ├── timeElapsed.ts         # Utility to calculate elapsed time for alerts
│   ├── hooks/
│       ├── useNotificationBanner.ts # Custom hook for banner fade-in animation
```

## Notification System

### Banner Notification

The app displays a banner notification if there are any unviewed alerts. The banner appears at the top of the screen with a custom message like "New Alert: Deer has been detected."

### Horizontal Scroll View for Alerts

The `AlertList` component uses a horizontal scroll view that shows the five most recent alerts (Last In, First Out order), with each alert displayed in a circular frame containing a deer icon.

## Usage Instructions

### Triggering Alerts

To trigger alerts within the app:

1. **Simulated Alerts**: The app can load mock data if the server is unreachable.
   - Mock data is located in `mock_data.json` under the `/src/mocks` folder.
   
2. **Fetching Real-Time Alerts**:
   - Real-time data can be fetched from the server via `getAlertLocations()` in `alertServices.ts`.
   - The function `getAlertLocations()` retrieves the latest alerts and displays them in the horizontal scroll view.

### Customizing Alerts

To customize the alert notification system:

1. **Change Notification Banner Message**:
   - Modify the banner message in `App.tsx` by changing the value of `notificationMessage`.
   - Example:
     ```typescript
     setNotificationMessage('Alert: Deer nearby. Drive safely!');
     ```

2. **Adjust Alert Image and Styling**:
   - Replace the deer icon with a custom image by updating the image source in `AlertList.tsx`.
   - Example:
     ```typescript
     <Image source={require('../assets/deer-shadow.webp')} style={alertListStyles.circle} />
     ```

3. **Setting the Alert Limit**:
   - The limit of 5 alerts displayed in the `AlertList` component is configurable.
   - Modify `locations.slice(0, 5)` in `AlertList.tsx` to change the number of alerts displayed.

### Example Code Snippets

Here’s an example of triggering a mock alert update within the app:

```typescript
useEffect(() => {
  const loadAlerts = async () => {
    const alerts = await getAlertLocations();
    const updatedAlerts = alerts.map(alert => ({
      ...alert,
      viewed: false, // Mark as unviewed to trigger the notification banner
    }));
    setLocations(updatedAlerts);
  };

  loadAlerts();
}, []);
```

This example fetches the alerts and marks them as unviewed to ensure they appear in the notification banner.

### Adding Custom Fonts

To add a custom font:

1. Place the font file in `assets/fonts/`.
2. In `App.tsx`, load the font using:

   ```typescript
   await Font.loadAsync({
     'CustomFont': require('./assets/fonts/CustomFont.ttf'),
   });
   ```

3. Update the styles in any component to use `fontFamily: 'CustomFont'`.

## Known Issues & Troubleshooting

- **Network Error**: If the app is unable to fetch alerts due to network issues, it will display an error message and revert to using mock data.
- **Font Loading Issue**: Ensure that font files are correctly placed in the `assets/fonts/` directory and paths are accurate in the code.

For additional questions or assistance, refer to the official documentation of the dependencies or contact the development team.
