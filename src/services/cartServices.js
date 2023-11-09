const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CartService {
  async getUserCart(userId) {
    try {
      let cart = await prisma.cart.findUnique({
        where: {
          userId
        },
        include: {
          items: true // If items are stored in a separate table related to the cart
        }
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: {
            userId,
            // ... other cart fields
          }
        });
      }

      return cart;
    } catch (error) {
      throw error; // Handle error appropriately
    }
  }

  async addToCart(userId, productId, quantity = 1) {
    try {
      const cart = await this.getUserCart(userId);

      const existingItem = cart.items.find(item => item.productId === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity
            // ... other cart item fields
          }
        });
      }

      return cart;
    } catch (error) {
      throw error; // Handle error appropriately
    }
  }

  async removeFromCart(userId, productId) {
    try {
      const cart = await this.getUserCart(userId);

      await prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
          productId
        }
      });

      return cart;
    } catch (error) {
      throw error; // Handle error appropriately
    }
  }
}

module.exports = new CartService();
