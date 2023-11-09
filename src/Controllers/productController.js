const productService = require('../services/productService');

const productController = {
  getAllProducts: (req, res) => {
    const products = productService.getAllProducts();
    res.status(200).json(products);
  },

  addProduct: (req, res) => {
    const { name, price, description, category, image, stock } = req.body;
    const newProduct = productService.addProduct(name, price, description, category, image, stock);
    res.status(201).json(newProduct);
  },

  getProductById: (req, res) => {
    const productId = parseInt(req.params.productId);
    const product = productService.getProductById(productId);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  },

  updateProduct: (req, res) => {
    const productId = parseInt(req.params.productId);
    const updatedData = req.body;
    const updatedProduct = productService.updateProduct(productId, updatedData);
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  },

  deleteProduct: (req, res) => {
    const productId = parseInt(req.params.productId);
    const deletedProduct = productService.deleteProduct(productId);
    if (deletedProduct) {
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  }
};

module.exports = productController;
