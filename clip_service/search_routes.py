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

        # Searching for similar products using FAISS (with scores)
        matched_results = search_faiss(query_embedding, top_k=4, return_scores=True)

        # Extract product IDs for querying MongoDB
        matched_ids = [product_id for product_id, _ in matched_results]

        # Fetching product details from MongoDB
        collection = get_mongo_collection()

        # Fetch all matched products from MongoDB (unordered)
        fetched_products = list(collection.find({ "_id": { "$in": [ObjectId(_id) for _id in matched_ids] }}))

        # Build a lookup map of product_id → product
        product_map = {str(product["_id"]): product for product in fetched_products}

        # Reorder according to FAISS similarity
        matched_products = []
        for product_id, score in matched_results:
            product = product_map.get(product_id)
            if product:
                product["_id"] = product_id  # Convert ObjectId to str
                product["similarity_score"] = round(float(score), 3)  # Add score
                matched_products.append(product)

        # Print to backend console
        print("\nSearch Results:")
        for product in matched_products:
            product_name = product.get("productName", "Unnamed Product")
            print(f"Product ID: {product['_id']} | Name: {product_name} | Similarity Score: {product['similarity_score']:.3f}")

        # Converting MongoDB ObjectId to string manually
        for product in matched_products:
            product["_id"] = str(product["_id"])

        # Returning matched products
        return {
            "matched": matched_products
        }

    except Exception as e:
        print(f"❌ Backend error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))