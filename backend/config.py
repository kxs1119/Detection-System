import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://kxs1119:abc@100.113.233.66/deersafe')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
