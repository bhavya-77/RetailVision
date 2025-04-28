const productModel = require("../../models/productModel")

const getCategoryProduct = async (req, res) => {
    try{
        const productCategory = await productModel.distinct("category")

        console.log("category", productCategory)

        // array to store one product from each category
        const productByCategory = []

        for(const category of productCategory){
            const product = await productModel.findOne({ category })

            if(product){
                productByCategory.push(product)
            }
        }

        res.json({
            message : "Product by category",
            success : true,
            error : false,
            data : productByCategory,
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

module.exports = getCategoryProduct;