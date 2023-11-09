const Cart = require('../models/Cart');

class CartService {
  constructor() {
    this.carts = []; // Simulated database for carts
  }

  getUserCart(userId) {
    let cart = this.carts.find(cart => cart.userId === userId);
    if (!cart) {
      cart = new Cart(userId);
      this.carts.push(cart);
    }
    return cart;
  }

  addToCart(userId, productId, quantity = 1) {
    const cart = this.getUserCart(userId);
    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    return cart;
  }

  removeFromCart(userId, productId) {
    const cart = this.getUserCart(userId);
    const index = cart.items.findIndex(item => item.productId === productId);
    if (index !== -1) {
      cart.items.splice(index, 1);
    }
    return cart;
  }
}

module.exports = new CartService();
