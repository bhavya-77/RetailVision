const productModel = require("../../models/productModel")

const searchProduct = async (req, res) => {
    try{
        const query = req.query.q

        const regex = new RegExp(query, 'i', 'g')

        const product = await productModel.find({
            "$or": [
                { productName: regex },
                { description: regex },
                { category: regex },
            ]
        })

        res.json({
            message : "Product searched successfully",
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

module.exports = searchProduct;