// Importing necessary helpers and models
const uploadProductPermission = require("../../helpers/permission");
const productModel = require("../../models/productModel");
const axios = require("axios");

async function UploadProductController(req, res) {
    try {
        // Getting user ID from session
        const sessionUserId = req.userId;

        // Checking if the user has permission to upload
        if (!uploadProductPermission(sessionUserId)) {
            throw new Error("You are not authorized to upload product");
        }

        // Extracting productImage URLs from the request body
        const imageURLs = req.body.productImage;

        // Sending image URLs to the Python CLIP server for embedding generation
        const embeddingResponse = await axios.post("http://localhost:8000/generate-embeddings", {
            urls: imageURLs
        });

        // Getting the embeddings returned from CLIP service
        const imageEmbeddings = embeddingResponse.data.embeddings;

        // Creating a new product instance and attaching embeddings
        const uploadProduct = new productModel({
            ...req.body,
            embeddings: imageEmbeddings
        });

        // Saving the product to MongoDB
        const saveProduct = await uploadProduct.save();

        // Sending successful response
        res.status(201).json({
            error: false,
            message: "Product uploaded successfully",
            success: true,
            data: saveProduct
        });

    } 
    catch (err) {
        // Handling errors
        res.status(400).json({
            error: true,
            message: err.message || err,
            success: false,
        });
    }
}

module.exports = UploadProductController;