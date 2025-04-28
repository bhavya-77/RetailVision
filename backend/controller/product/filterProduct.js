const productModel = require("../../models/productModel")

const filterProductController = async(req, res) => {
    try{
        const categoryList = req?.body?.category || []

        const product = await productModel.find({
            category : {
                "$in" : categoryList
            }
        })

        res.json({
            message : "Product by category fetched successfully",
            success : true,
            error : false,
            data : product,
        })
    }

    catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}

module.exports = filterProductController;