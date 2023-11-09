const productService = require("../services/productServices")

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve products' });
    }
  },

  addProduct: async (req, res) => {
    const { name, price, description, category, image, stock } = req.body;
    try {
      const newProduct = await productService.addProduct(name, price, description, category, image, stock);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: 'Product creation failed' });
    }
  },

  getProductById: async (req, res) => {
    const productId = parseInt(req.params.productId);
    try {
      const product = await productService.getProductById(productId);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving product' });
    }
  },

  updateProduct: async (req, res) => {
    const productId = parseInt(req.params.productId);
    const updatedData = req.body;
    try {
      const updatedProduct = await productService.updateProduct(productId, updatedData);
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating product' });
    }
  },

  deleteProduct: async (req, res) => {
    const productId = parseInt(req.params.productId);
    try {
      const deletedProduct = await productService.deleteProduct(productId);
      if (deletedProduct) {
        res.status(200).json(deletedProduct);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error deleting product' });
    }
  }
};

module.exports = productController;
