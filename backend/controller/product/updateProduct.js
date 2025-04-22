const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function updateProductControlller(req, res){
    try{

        if(!uploadProductPermission(req.userId)){
            throw new Error("You are not authorized to upload product")
        }

        const {_id, ...resBody} = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)

        res.json({
            message: "Product updated successfully",
            success: true,
            data: updateProduct,
            error: false
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

module.exports = updateProductControlller