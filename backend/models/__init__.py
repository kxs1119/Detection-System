from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import Config  # Updated import to reflect correct path

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)

    with app.app_context():
        from . import models, schema  # Import models and schema
        db.create_all()              # Create database tables

    return app
