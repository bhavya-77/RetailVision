# Importing required libraries
from mongodb_config import get_mongo_collection
import numpy as np
import faiss

# Initializing global variables for FAISS and ID mapping
faiss_index = None
id_map = []  # Storing MongoDB _ids corresponding to FAISS index entries

# Creating a function that is building the FAISS index in memory
def build_faiss_index():
    global faiss_index, id_map

    # Connecting to MongoDB collection
    collection = get_mongo_collection()

    # Fetching all products that contain embeddings
    products = list(collection.find({"embeddings": {"$exists": True, "$ne": []}}))

    vectors = []
    id_map = []

    for product in products:
        # Looping through all embeddings of each product (1 per image)
        for emb in product["embeddings"]:
            vectors.append(emb)
            id_map.append(str(product["_id"]))

    if not vectors:
        print("❌ No embeddings found to build FAISS index.")
        return

    # Converting list of vectors into numpy array of type float32
    vectors_np = np.array(vectors).astype("float32")

    # Creating a FAISS index for L2 (Euclidean) distance search
    faiss_index = faiss.IndexFlatL2(vectors_np.shape[1])
    faiss_index.add(vectors_np)

    print(f"✅ FAISS index is built with {len(vectors)} vectors from {len(products)} products.")

# Creating a function that is searching the FAISS index with a given query vector
def search_faiss(query_vector, top_k=5):
    if faiss_index is None:
        raise ValueError("FAISS index is not built. Please run build_faiss_index() first.")

    # Making sure the query vector is 2D (batch of 1)
    query_vector_np = np.array(query_vector).astype("float32").reshape(1, -1)

    # Performing the search
    distances, indices = faiss_index.search(query_vector_np, top_k)

    # Mapping FAISS indices back to MongoDB product IDs
    result_ids = [id_map[i] for i in indices[0]]

    return result_ids