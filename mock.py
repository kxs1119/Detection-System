# mock_data.py
import json
mock_alerts = [
    {
        "id": 1,
        "device": "Raspberry Pi",
        "time_stamp": "2024-10-31T14:20:00Z",
        "latitude": "40.7128",
        "longitude": "-74.0060",
        "location": "New York City",
        "detection_time": "2024-10-31T14:20:00Z",
        "detection_id": 1234,
        "alert_count": 1,
        "animal_type": "Deer"
    },
    {
        "id": 2,
        "device": "Raspberry Pi",
        "time_stamp": "2024-10-31T15:45:00Z",
        "latitude": "34.0522",
        "longitude": "-118.2437",
        "location": "Los Angeles",
        "detection_time": "2024-10-31T15:45:00Z",
        "detection_id": 5678,
        "alert_count": 2,
        "animal_type": "Deer"
    },
    {
        "id": 3,
        "device": "Raspberry Pi",
        "time_stamp": "2024-10-31T15:45:00Z",
        "latitude": "34.0522",
        "longitude": "-118.2437",
        "location": "baltimore",
        "detection_time": "2024-10-31T15:45:00Z",
        "detection_id": 5678,
        "alert_count": 2,
        "animal_type": "Deer"
    },
    {
        "id": 4,
        "device": "Raspberry Pi",
        "time_stamp": "2024-10-31T15:45:00Z",
        "latitude": "34.0522",
        "longitude": "-118.2437",
        "location": "Wyoming",
        "detection_time": "2024-10-31T15:45:00Z",
        "detection_id": 5678,
        "alert_count": 2,
        "animal_type": "Deer"
    }
]

# Write the mock data to a JSON file
with open('DeerSafeApp/src/mocks/mock_data.json', 'w') as f:
    json.dump(mock_alerts, f)