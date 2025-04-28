const productModel = require("../../models/productModel")

const getProductDetails = async(req, res) => {
    try{
        const { productId } = req.body

        const product = await productModel.findById(productId)

        res.json({
            data: product,
            message: "Product details fetched",
            error: false,
            success: true,
        })
    }
    catch (err) {
        res.status(400).json({
            error: true,
            message: err?.message || err,
            success: false,
        })
    }
}

module.exports = getProductDetails;