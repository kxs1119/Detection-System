import json
import os

def ensure_file_exists(filepath, default_data):
    if not os.path.exists(filepath):
        with open(filepath, 'w') as file:
            json.dump(default_data, file)

def read_json_file(filepath):
    with open(filepath, 'r') as file:
        return json.load(file)

def write_json_file(filepath, data):
    with open(filepath, 'w') as file:
        json.dump(data, file, indent=4)