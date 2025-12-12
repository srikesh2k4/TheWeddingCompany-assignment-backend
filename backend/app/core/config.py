import os
from dotenv import load_dotenv
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "master_db")
JWT_SECRET = os.getenv("JWT_SECRET", "CHANGE_ME")
JWT_ALGO = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60*24
