const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware/index');
const { addcategory, getCategories } = require("../controller/category")
const router = express.Router();
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage });

router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'), addcategory);
router.get('/category/getCategory', getCategories);
module.exports = router;