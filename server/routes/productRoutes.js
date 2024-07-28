const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 
const {createProduct, updateProduct, requestDeleteProduct, getProductList} = require("../controllers/productController")

router.post('/create/:storeID', authMiddleware, createProduct);
router.put('/updateProduct/:productID', authMiddleware, updateProduct);
router.put('/requestDeleteProduct/:productID', authMiddleware, requestDeleteProduct);
router.get('/getProductList/:userID', authMiddleware, getProductList);

module.exports = router;