const express = require('express');
const productController = require('../controllers/ProductController');
const authenticate = require('../middleware/AuthMiddleware');

const router = express.Router();

// Create a product
router.post('/', authenticate, productController.createProduct);
// router.post('/', productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);
// router.get('/', productController.getAllProducts);

// Get a single product by ID
// router.get('/:id', productController.getProductById);
router.get('/:id', productController.getProductById);

router.post('/selected', productController.getProductsByIds);


// Update a product
router.put('/:id', authenticate, productController.updateProduct);
// router.put('/:id', productController.updateProduct);

// Delete a product
router.delete('/:id', authenticate, productController.deleteProduct);
// router.delete('/:id', productController.deleteProduct);

module.exports = router;
