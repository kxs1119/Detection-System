from app import db

class SensorData(db.Model):
    __tablename__ = 'sensor_data'
    id = db.Column(db.Integer, primary_key=True)
    sensor_name = db.Column(db.String(50), nullable=False)
    value = db.Column(db.Float, nullable=False)
