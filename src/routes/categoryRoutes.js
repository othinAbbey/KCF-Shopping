const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryByPrice, getCategoryByMake, addCategory } = require("../Controllers/categoriesController");

// Get all categories
router.get('/', getAllCategories);

// Get category by price
router.get('/:price', getCategoryByPrice);

// Get category by make
router.get('/:make', getCategoryByMake);

// Add a new category
router.post('/', addCategory);

module.exports = router;