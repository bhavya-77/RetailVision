const express = require('express');

const router = express.Router();

const userSignUpController = require('../controller/userSignUp');
const userSignInController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const UploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductControlller = require('../controller/product/updateProduct');


router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);

router.get("/user-details", authToken, userDetailsController);
router.get("/logout", userLogout);

// admin panel
router.get('/all-users', authToken, allUsers)
router.post('/update-user', authToken, updateUser)

// product
router.post('/upload-product', authToken, UploadProductController)
router.get('/get-product', getProductController)
router.post('/update-product', authToken, updateProductControlller)



module.exports = router;