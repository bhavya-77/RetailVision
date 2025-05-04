# Importing necessary libraries and functions
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
from PIL import Image
from io import BytesIO
import torch
import clip
from bson.objectid import ObjectId

from faiss_service import search_faiss
from mongodb_config import get_mongo_collection

# Creating FastAPI router object
router = APIRouter()

# Loading CLIP model and preprocessing pipeline
from clip_model import model, preprocess, device


# Defining request body structure
class ImageSearchRequest(BaseModel):
    url: str

# Creating /search-by-image endpoint
@router.post("/search-by-image")
async def search_by_image(request: ImageSearchRequest):
    try:
        # Downloading the image from the given URL
        response = requests.get(request.url)
        image = Image.open(BytesIO(response.content)).convert("RGB")

        # Preprocessing and encoding the image
        image_tensor = preprocess(image).unsqueeze(0).to(device)
        with torch.no_grad():
            query_embedding = model.encode_image(image_tensor).squeeze(0).cpu().numpy().tolist()

        # Searching for similar products using FAISS
        matched_ids = search_faiss(query_embedding, top_k=5)

        # Fetching product details from MongoDB
        collection = get_mongo_collection()
        matched_products = list(collection.find({ "_id": { "$in": [ObjectId(_id) for _id in matched_ids] }}))

        # Converting MongoDB ObjectId to string manually
        for product in matched_products:
            product["_id"] = str(product["_id"])

        # Returning matched products
        return {
            "matched": matched_products
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))