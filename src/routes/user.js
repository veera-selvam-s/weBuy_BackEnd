const express = require('express');
const {signup} = require ('../controller/user');
const router = express.Router();


//get method
router.get('/signin',(req,res)=>{

});

//post method
router.post('/signup',signup);


module.exports = router;