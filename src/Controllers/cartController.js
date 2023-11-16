const cartService = require("../services/cartServices");

const cartController = {
  getCart: async (req, res) => {
    const userId = req.userId; // Assuming userId is obtained from authentication middleware
    try {
      const cart = await cartService.getUserCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve cart' });
    }
  },

  addItemToCart: async (req, res) => {
    const userId = req.userId; // Assuming userId is obtained from authentication middleware
    const productId = parseInt(req.body.productId);
    const quantity = parseInt(req.body.quantity);
    try {
      const updatedCart = await cartService.addToCart(userId, productId, quantity);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add item to cart' });
    }
  },

  removeItemFromCart: async (req, res) => {
    const userId = req.userId; // Assuming userId is obtained from authentication middleware
    const productId = parseInt(req.params.productId);
    try {
      const updatedCart = await cartService.removeFromCart(userId, productId);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: 'Failed to remove item from cart' });
    }
  },

  updateCartItemQuantity: async (req, res) => {
    const userId = req.userId; // Assuming userId is obtained from authentication middleware
    const productId = parseInt(req.params.productId);
    const quantity = parseInt(req.body.quantity);
    
    try {
      const updatedCart = await cartService.updateCartItemQuantity(userId, productId, quantity);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update item quantity in cart' });
    }
  }
};

module.exports = cartController;
