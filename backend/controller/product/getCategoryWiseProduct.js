const productModel = require("../../models/productModel")

const getCategoryWiseProduct = async (req, res) => {
    try{
        const { category } = req?.body || req?.query
        const product = await productModel.find({ category })

        res.json({
            message: "Category Wise Product",
            data: product,
            success: true,
            error: false,
        })
    }
    catch (err) {
        res.status(400).json({
            error: true,
            message: err.message || err,
            success: false,
        })
    }
}

module.exports = getCategoryWiseProduct;