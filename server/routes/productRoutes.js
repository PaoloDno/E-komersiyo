const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); 
const { createProduct,
    updateProduct,
    requestDeleteProduct,
    getProductListUser,
    getProductListStore
  } = require("../controllers/productController.js")

router.post('/create/:storeID', authMiddleware, createProduct);
router.put('/updateProduct/:productID', authMiddleware, updateProduct);
router.put('/requestDeleteProduct/:productID', authMiddleware, requestDeleteProduct);
router.get('/getProductListUser/:userID', authMiddleware, getProductListUser);
router.get('/getProductListStore/:userID', authMiddleware, getProductListStore);

module.exports = router;