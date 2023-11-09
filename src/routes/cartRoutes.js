
const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get the cart for a specific user (with authentication)
router.get('/:userId/cart', authMiddleware.verifyToken, cartController.getCart);

// Add an item to the user's cart (with authentication)
router.post('/:userId/cart/items', authMiddleware.verifyToken, cartController.addItemToCart);

// Update the quantity of a specific item in the user's cart (with authentication)
router.put('/:userId/cart/items/:productId', authMiddleware.verifyToken, cartController.updateCartItemQuantity);

// Remove a specific item from the user's cart (with authentication)
router.delete('/:userId/cart/items/:productId', authMiddleware.verifyToken, cartController.removeItemFromCart);

module.exports = router;





// const express = require('express');
// const router = express.Router();
// const cartController = require('../controllers/cartController');

// // Get the cart for a specific user
// router.get('/:userId/cart', cartController.getCart);

// // Add an item to the user's cart
// router.post('/:userId/cart/items', cartController.addItemToCart);

// // Update the quantity of a specific item in the user's cart
// router.put('/:userId/cart/items/:productId', cartController.updateCartItemQuantity);

// // Remove a specific item from the user's cart
// router.delete('/:userId/cart/items/:productId', cartController.removeItemFromCart);

// module.exports = router;
// //       res.status(404).json({ error: 'Product not found' });
// //     } else {
// //       res.json(updatedProduct);
// //     }
// //   } catch (error) {
// //     res.status(500).json({ error: 'Failed to update the product' });
// //   }
// // });
// //