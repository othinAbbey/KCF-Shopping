const cartService = require('../services/cartService');

const cartController = {
  viewCart: (req, res) => {
    const userId = req.userId; // Assuming userId is obtained from authentication middleware
    const cart = cartService.getUserCart(userId);
    res.status(200).json(cart);
  },

  addToCart: (req, res) => {
    const userId = req.userId; // Assuming userId is obtained from authentication middleware
    const productId = parseInt(req.body.productId);
    const quantity = parseInt(req.body.quantity);
    const updatedCart = cartService.addToCart(userId, productId, quantity);
    res.status(200).json(updatedCart);
  },

  removeFromCart: (req, res) => {
    const userId = req.userId; // Assuming userId is obtained from authentication middleware
    const productId = parseInt(req.params.productId);
    const updatedCart = cartService.removeFromCart(userId, productId);
    res.status(200).json(updatedCart);
  }
};

module.exports = cartController;
