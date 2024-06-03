const express = require('express');
const router = express.Router();

const ProductController = require('../controller/product');

const { upload } = require('../utils/uploadImage');

router.post('/products', upload.array("images"), ProductController.createProduct);
router.get('/products', ProductController.getProducts);
router.get('/products/:id', ProductController.getProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);
router.get('/products/search', ProductController.searchProducts);

module.exports = router;
