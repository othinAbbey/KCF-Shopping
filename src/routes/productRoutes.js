const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create a new product
router.post('/', async (req, res) => {
  const { name, price, description, category, image, stock } = req.body;
  try {
    const newProduct = await productController.createProduct(name, price, description, category, image, stock);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a product' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await productController.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get a specific product by ID
router.get('/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await productController.getProductById(productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the product' });
  }
});

// Update a specific product by ID
router.patch('/:productId', async (req, res) => {
  const productId = req.params.productId;
  const { name, price, description, category, image, stock } = req.body;
  try {
    const updatedProduct = await productController.updateProduct(productId, name, price, description, category, image, stock);
    if (!updatedProduct) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the product' });
  }
});

// Delete a specific product by ID
router.delete('/:productId', async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await productController.deleteProduct(productId);
    if (!deletedProduct) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(deletedProduct);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the product' });
  }
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');

// // Create a new product
// router.post('/', async (req, res) => {
//   const { name, price, description, category, image, stock } = req.body;
//   try {
//     const newProduct = await productController.createProduct(name, price, description, category, image, stock);
//     res.json(newProduct);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create a product' });
//   }
// });

// // Get all products
// router.get('/', async (req, res) => {
//   try {
//     const products = await productController.getAllProducts();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch products' });
//   }
// });

// // Get a specific product by ID
// router.get('/:productId', async (req, res) => {
//   const productId = req.params.productId;
//   try {
//     const product = await productController.getProductById(productId);
//     if (!product) {
//       res.status(404).json({ error: 'Product not found' });
//     } else {
//       res.json(product);
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch the product' });
//   }
// });

// // Update a specific product by ID
// router.patch('/:productId', async (req, res) => {
//   const productId = req.params.productId;
//   const { name, price, description, category, image, stock } = req.body;
//   try {
//     const updatedProduct = await productController.updateProduct(productId, name, price, description, category, image, stock);
//     if (!updatedProduct) {
//       res.status(404).json({ error: 'Product not found' });
//     } else {
//       res.json(updatedProduct);
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to update the product' });
//   }
// });

// // Delete a specific product by ID
// router.delete('/:productId', async (req, res) => {
//   const productId = req.params.productId;
//   try {
//     const deletedProduct = await productController.deleteProduct(productId);
//     if (!deletedProduct) {
//       res.status(404).json({ error: 'Product not found' });
//     } else {
//       res.json(deletedProduct);
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete the product' });
//   }
// });

// module.exports = router;
