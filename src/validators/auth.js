const {check} = require('express-validator');
const { validationResult } = require ('express-validator');

exports.validateRequest=[
    check('firstName')
    .notEmpty()
    .withMessage('firstName is required'),
    check('lastName')
    .notEmpty()
    .withMessage('lastName is required'),
    check('email')
    .notEmpty()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min:6 })
    .withMessage('password must be at least 6 charechters long'),
];

exports.validateSigninRequest=[
    check('email')
    .notEmpty()
    .withMessage('Valid Email is required'),
    check('password')
    .isLength({ min:6 })
    .withMessage('password must be at least 6 charechters long'),
];

exports.isRequestValidated = (req,res,next)=>{
    const errors = validationResult(req);
    if(errors.array().length>0){
        return res.status(400).json({ error: errors.array() });
    }
    next();
}