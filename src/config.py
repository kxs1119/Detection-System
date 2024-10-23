# config.py
class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://kenny:powerful1@100.89.198.120:5432/sensor_data'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True
    SECRET_KEY = 'your_secret_key'
