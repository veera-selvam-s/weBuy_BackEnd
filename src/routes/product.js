const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware/index');
const { createProduct } = require('../controller/product');
// const { addcategory, getCategories } = require("../controller/category")

const  multer = require ('multer');
const upload = multer({dest:'uploads/'});
const router = express.Router();


router.post('/product/create', requireSignin, upload.single('productPicture'),adminMiddleware, createProduct);
// router.get('/category/getCategory', getCategories);
module.exports = router;