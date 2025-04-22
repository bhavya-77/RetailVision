const userModel = require("../../models/userModel")

async function userDetailsController(req, res) {
    try {
        console.log("userId", req.userId)
        const user = await userModel.findById(req.userId)

        res.status(200).json({
            message: "User details fetched successfully",
            data: user,
            error: false,
            success: true,
        })

        console.log("user", user)
    } 
    
    catch (err) {
        res.status(400).json({
            error: true,
            message: err.message || err,
            success: false,
        })
    }
}

module.exports = userDetailsController;