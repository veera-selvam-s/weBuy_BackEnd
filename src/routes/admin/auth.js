const express = require('express');
const {signup,signin,requireSignin} = require ('../../controller/admin/auth');
const router = express.Router();


//signin
router.post('/admin/signin',signin);

//sign up
router.post('/admin/signup',signup);

// router.post('/profile',requireSignin,(req,res)=>{
//     res.status(200).json({
//         user:'profile'
//     })
// });

module.exports = router;