const express = require('express');
const router = express.Router();
const productController = require("../Controllers/productController");
const { verifyToken } = require('../middlewares/authMiddleware');
const {addProduct, getAllProducts, getProductById, updateProduct, deleteProduct} = require("../Controllers/productController");
// const { routes } = require('../app');

//Route to add a product only by verification
router.post('/',verifyToken,addProduct);


router.get('/', getAllProducts);

// Get a specific product by ID
router.get('/:productId', getProductById);


// Update a specific product by ID
// router.put('/:productId', verifyToken,productController.updateProduct);
router.put('/:productId',verifyToken,updateProduct);


// Delete a specific product by ID
// router.delete('/:productId', verifyToken,productController.deleteProduct);
router.delete('/:productId',verifyToken,deleteProduct);


module.exports = router;


