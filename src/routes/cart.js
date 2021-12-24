const express = require('express');
const { requireSignin, userMiddleware } = require('../common-middleware/index');
const { addItemToCart, addToCart, getCartItems } = require('../controller/cart');
const router = express.Router();

router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart);
//router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
router.post('/user/getCartItems', requireSignin, userMiddleware, getCartItems);


module.exports = router;
