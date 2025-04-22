const userModel = require("../../models/userModel");

async function allUsers(req, res) {
    try{
        console.log("user id all Users", req.userId)

        const allUsers =await userModel.find()

        res.json({
            message: "All User",
            data: allUsers,
            success: true,
            error: false,
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

module.exports = allUsers;