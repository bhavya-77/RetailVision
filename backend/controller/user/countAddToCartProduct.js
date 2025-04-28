const addToCartModel = require("../../models/cartProduct")

const countAddToCartProduct = async (req, res) => {
    try{
        const userId = req.userId

        const count = await addToCartModel.countDocuments({
            userId: userId
        })

        res.json({
            data: {count : count},
            message: "Count of products in cart",
            success: true,
            error: false,
        })
    }
    catch (err) {
        res.json({
            error: true,
            message: err.message || err,
            success: false,
        })
    }
}

module.exports = countAddToCartProduct;