const { default: SummaryAPI } = require("../common")

const fetchCategoryWiseProduct = async (category) => {
    const response = await fetch(SummaryAPI.categoryWiseProduct.url, {
        method: SummaryAPI.categoryWiseProduct.method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            category : category
        })
    })

    const dataResponse = await response.json()

    return dataResponse
}

export default fetchCategoryWiseProduct;