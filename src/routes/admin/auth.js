const express = require('express');
const {signup,signin,requireSignin} = require ('../../controller/admin/auth');
const { validateRequest, isRequestValidated, validateSigninRequest } = require('../../validators/auth');
const router = express.Router();


//signin
router.post('/admin/signin', validateSigninRequest, isRequestValidated ,signin);

//sign up
router.post('/admin/signup',validateRequest,isRequestValidated,signup);

// router.post('/profile',requireSignin,(req,res)=>{
//     res.status(200).json({
//         user:'profile'
//     })
// });

module.exports = router;