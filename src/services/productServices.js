const Product = require('../models/Product');

class ProductService {
  constructor() {
    this.products = []; // Assume products are stored in an array (simulated database)
  }

  getAllProducts() {
    return this.products;
  }

  addProduct(name, price, description, category, image, stock) {
    const id = this.products.length + 1;
    const newProduct = new Product(id, name, price, description, category, image, stock);
    this.products.push(newProduct);
    return newProduct;
  }

  getProductById(productId) {
    return this.products.find(product => product.id === productId);
  }

  updateProduct(productId, updatedData) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedData };
      return this.products[index];
    }
    return null;
  }

  deleteProduct(productId) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      const deletedProduct = this.products[index];
      this.products.splice(index, 1);
      return deletedProduct;
    }
    return null;
  }
}

module.exports = new ProductService();
