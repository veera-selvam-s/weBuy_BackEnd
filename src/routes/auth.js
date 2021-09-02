const express = require('express');
const {signup,signin,requireSignin} = require ('../controller/auth');
const router = express.Router();


//get method
router.post('/signin',signin);

//post method
router.post('/signup',signup);

// router.post('/profile',requireSignin,(req,res)=>{
//     res.status(200).json({
//         user:'profile'
//     })
// });

module.exports = router;