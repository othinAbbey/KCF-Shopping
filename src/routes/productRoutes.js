const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken } = require("../middlewares/authMiddleware");
// const { routes } = require('../app');

router.post('/', verifyToken ,productController.addProduct);
// router.post('/',productController.addProduct);


router.get('/', productController.getAllProducts);

// Get a specific product by ID
router.get('/:productId', productController.getProductById);


// Update a specific product by ID
router.put('/:productId', verifyToken,productController.updateProduct);


// Delete a specific product by ID
router.delete('/:productId', verifyToken,productController.deleteProduct);


module.exports = router;


