# Importing core FastAPI classes
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Importing required modules for CLIP and image processing
import torch
import clip
from PIL import Image
import requests
from io import BytesIO

# Creating FastAPI server instance
app = FastAPI()

# Adding CORS middleware to allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can later restrict to ["http://localhost:3000"] in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading the CLIP model and preprocessing function from shared file
from clip_model import model, preprocess, device

# Defining the request body schema for /generate-embeddings
class ImageURLs(BaseModel):
    urls: list

# Creating an endpoint that is generating embeddings for uploaded image URLs
@app.post("/generate-embeddings")
async def generate_embeddings(data: ImageURLs):
    try:
        embeddings = []

        # Looping through each image URL sent in the request
        for url in data.urls:
            # Downloading the image from the given URL
            response = requests.get(url)

            # Converting image into RGB PIL format
            image = Image.open(BytesIO(response.content)).convert("RGB")

            # Preprocessing image for CLIP and moving it to device
            image_input = preprocess(image).unsqueeze(0).to(device)

            # Encoding the image to a 512-dim vector using CLIP
            with torch.no_grad():
                image_embedding = model.encode_image(image_input)
                image_embedding = image_embedding.squeeze(0).cpu().numpy().tolist()

            # Appending embedding to results list
            embeddings.append(image_embedding)

        # Returning the list of image embeddings
        return {"embeddings": embeddings}

    except Exception as e:
        # Catching any errors and returning HTTP 500
        raise HTTPException(status_code=500, detail=str(e))

# Importing the search routes for image similarity search
from search_routes import router

# Including the search API routes in the FastAPI app
app.include_router(router)

# Importing and building the FAISS index at server startup
from faiss_service import build_faiss_index
build_faiss_index()

# Running this block only if executing the script directly (optional for testing)
if __name__ == "__main__":
    print("✅ FastAPI server started with FAISS index ready.")