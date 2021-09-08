const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware/index');
// const { addcategory, getCategories } = require("../controller/category")
const router = express.Router();
const Product = require('../models/product')

router.post('/product/create', requireSignin, adminMiddleware, (req,res)=>{
    res.status(200).json({message:"hello"})
});
// router.get('/category/getCategory', getCategories);
module.exports = router;