const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categoriesController = {
    getAllCategories: async (req,res) => {
        try {
            const categories = await prisma.category.findMany();
            res.send(categories);
            return categories;
        } catch (error) {
            throw error;
        }
    },

    getCategoryByPrice: async (req,res) => {
        try {
            const category = await prisma.category.findUnique({
                where: {
                    price: req.params.price
                }
            })
            return category;
        } catch (error) {
            throw error;
        }
    },

    getCategoryByMake: async (req, res) => {
        try {
            const category = await prisma.category.findUnique({
                where: {
                    make: req.params.make
                }
            })
            return category;
        } catch (error) {
            throw error;
        }
    },

    addCategory: async (req, res) => {
        const { name, price, description, category, image, stock } = req.body;
        try {
            const newCategory = await prisma.category.create({
                data: {
                    name,
                    price,
                    description,
                    category,
                    image,
                    stock,
                }
            })
            return newCategory;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = categoriesController;