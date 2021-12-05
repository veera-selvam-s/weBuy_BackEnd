const express = require('express');
const { signup, signin,signout } = require('../../controller/admin/auth');
const { validateRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');
const { requireSignin } = require('../../common-middleware');
const router = express.Router();


//signin
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);

//sign up
router.post('/admin/signup', validateRequest, isRequestValidated, signup);

//sign out
router.post('admin/signout',requireSignin,signout);

// router.post('/profile',requireSignin,(req,res)=>{
//     res.status(200).json({
//         user:'profile'
//     })
// });

module.exports = router;