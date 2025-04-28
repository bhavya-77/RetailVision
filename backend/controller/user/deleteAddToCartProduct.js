const addToCartModel = require("../../models/cartProduct")

const deleteAddToCartProduct = async (req, res) => {
    try{
        const currentUser = req.userId
        const addToCartProductId = req.body._id

        const deleteProduct = await addToCartModel.deleteOne({_id : addToCartProductId})

        res.json({
            message: "Product deleted successfully",
            success: true,
            error: false,
            data: deleteProduct,
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

module.exports = deleteAddToCartProduct;