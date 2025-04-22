const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function UploadProductController(req, res){
    try{
        const sessionUserId = req.userId

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("You are not authorized to upload product")
        }

        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            error: false,
            message: "Product uploaded successfully",
            success: true,
            data: saveProduct
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

module.exports = UploadProductController;