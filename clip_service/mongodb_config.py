# Importing required libraries
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Loading environment variables from .env file
load_dotenv()

# Creating a function that connects to MongoDB and returns the collection
def get_mongo_collection():
    # Reading MONGODB_URI from environment
    mongo_uri = os.getenv("MONGODB_URI")
    
    db_name = "MERN"
    collection_name = "products"
    
    # Connecting to MongoDB
    client = MongoClient(mongo_uri)
    db = client[db_name]
    collection = db[collection_name]

    # Returning the MongoDB products collection
    return collection