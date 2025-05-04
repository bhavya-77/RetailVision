// Defining a function that is calling the AI search backend using a Cloudinary image URL
const searchProductByImage = async (imageUrl) => {
    try {
        // Sending a POST request to the FastAPI backend with the image URL
        const response = await fetch("http://localhost:8000/search-by-image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: imageUrl }),
        });

        // Waiting for the response and converting it to JSON
        const data = await response.json();

        // Returning the matched product data from the response
        return data.matched;
    } catch (error) {
        // Catching and logging any error that occurs during the request
        console.error("Error searching product by image:", error);
        return [];
    }
};

export default searchProductByImage;