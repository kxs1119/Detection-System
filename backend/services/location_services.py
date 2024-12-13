import json
import logging
import asyncio
import math

def process_location(data):
    logging.info('we are in boyz')
    try:
        latitude, longitude = data["latitude"], data["longitude"]
        
        nearest_point = find_nearest(latitude, longitude)

        print(f"Nearest point found!\nLatitude: {nearest_point['latitude']}\nLongitude: {nearest_point['longitude']}\nDistance: {nearest_point['distance']}km\n")

        if nearest_point['distance'] <= 0.25:   
            logging.info('We got a hit boys')
            return nearest_point
        else:
            logging.info('We missed a hit boys')
            return False
        
    except Exception as e:
        print('Error: ', e)



def deg_to_rad(deg):
    return deg * (math.pi / 180)

def haversine_distance(latitude, longitude, point):
    lat2 = point["latitude"]
    lon2 = point["longitude"]

    r = 6371
    dLat = deg_to_rad(lat2 - latitude)
    dLon = deg_to_rad(lon2 - longitude)
    a = math.sin(dLat / 2) * math.sin(dLat / 2) * math.cos(deg_to_rad(latitude)) + math.cos(deg_to_rad(lat2)) * math.sin(dLon / 2) * math.sin(dLon / 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance = r * c

    return distance

def find_nearest(latitude, longitude):
    nearest_point = {"latitude": 0.0, "longitude": 0.0, "distance": 100000}

    with open("../DeerSafeApp/src/mocks/mock_data.json", "r") as file:
        data = json.load(file)

        for point in data:
            distance = haversine_distance(latitude, longitude, point)
            logging.info(f'Distance Calculator here = {distance}')
            if distance < nearest_point["distance"]:
                nearest_point["latitude"] = point["latitude"]
                nearest_point["longitude"] = point["longitude"]
                nearest_point["distance"] = distance

    return nearest_point




    