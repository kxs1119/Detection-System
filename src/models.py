from . import db

class User(db.Model):
    __tablename__ = 'Users'  # Ensure this matches the actual table name in the database

    user_id = db.Column(db.Integer, primary_key=True)  # Primary Key
    name = db.Column(db.String(255), nullable=False)  # Name field with max length 255
    email = db.Column(db.String(255), unique=True, nullable=False)  # Email field with max length 255
    phone = db.Column(db.String(20), nullable=True)  # Phone field with max length 20
    alert_preference = db.Column(db.String(255), nullable=True)  # Alert preference with max length 255
    settings = db.Column(db.JSON, nullable=True)  # Settings as JSON field
    password = db.Column(db.String(255), nullable=False)  # Password with max length 255
    username = db.Column(db.String(255), unique=True, nullable=False)  # Username with max length 255

class Alert(db.Model):
    __tablename__ = 'Alerts'
    
    alert_id = db.Column(db.Integer, primary_key=True)  # PK
    device_id = db.Column(db.Integer, nullable=False)
    location_id = db.Column(db.Integer, nullable=False)
    alert_type = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime(timezone=True), nullable=False)
    status = db.Column(db.String(50), nullable=False)
