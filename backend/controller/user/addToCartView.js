const addToCartModel = require("../../models/cartProduct")

const addToCartView = async (req, res) => {
    try{
        const currentUser = req.userId

        const allProduct = await addToCartModel.find({ userId: currentUser }).populate("productId")

        res.json({
            data: allProduct,
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

module.exports = addToCartView;