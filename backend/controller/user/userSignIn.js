const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            throw new Error("Please provide Email");
        }

        if (!password) {
            throw new Error("Please provide Password");
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error("User not found with this email");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            const tokenData = {
                _id : user._id,
                email : user.email,
            };

            const token = await jwt.sign(
                tokenData, 
                process.env.TOKEN_SECRET_KEY, 
                { expiresIn: '1h' });

            const tokenOption = {
                httpOnly: true,
                secure: true,
            };

            res.cookie("token", token).json({
                message: "Login successful",
                data: token,
                success: true,
                error: false,
            });
            
        } else{
            throw new Error("Invalid password");
        }

        // res.status(200).json({
        //     data: user,
        //     success: true,
        //     error: false,
        //     message: "User signed in successfully",
        // });
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;