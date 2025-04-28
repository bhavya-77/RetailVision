const addToCartModel = require("../../models/cartProduct")

const updateAddToCartProduct  = async (req, res) => {
    try{
        const currentUser = req.userId
        const addToCartProductId = req?.body?._id

        const qty = req.body.quantity

        const updateProduct = await addToCartModel.findOneAndUpdate({_id : addToCartProductId}, {
            ...(qty && {quantity: qty})
        })

        res.json({
            message: "Product updated successfully",
            success: true,
            error: false,
            data: updateProduct,
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

module.exports = updateAddToCartProduct;