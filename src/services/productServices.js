// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// class ProductService {

//   async getAllProducts() {
//     try {
//       const products = await prisma.product.findMany();
//       return products;
//     } catch (error) {
//       throw error; // Handle error appropriately
//     }
//   }

//   async addProduct(name, price, description, category, image, stock) {
//     try {
//       const newProduct = await prisma.product.create({
//         data: {
//           name,
//           price,
//           description,
//           category,
//           image,
//           stock,
//           // ... other product fields
//         }
//       });
//       return newProduct;
//     } catch (error) {
//       throw error; // Handle error appropriately
//     }
//   }

//   async getProductById(productId) {
//     try {
//       const product = await prisma.product.findUnique({
//         where: {
//           id: productId
//         }
//       });
//       return product;
//     } catch (error) {
//       throw error; // Handle error appropriately
//     }
//   }

//   async updateProduct(productId, updatedData) {
//     try {
//       const updatedProduct = await prisma.product.update({
//         where: {
//           id: productId
//         },
//         data: updatedData
//       });
//       return updatedProduct;
//     } catch (error) {
//       throw error; // Handle error appropriately
//     }
//   }

//   async deleteProduct(productId) {
//     try {
//       const deletedProduct = await prisma.product.delete({
//         where: {
//           id: productId
//         }
//       });
//       return deletedProduct;
//     } catch (error) {
//       throw error; // Handle error appropriately
//     }
//   }
// }

// module.exports = new ProductService();


// productService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProductService {
  async getAllProducts() {
    try {
      const products = await prisma.product.findMany();
      return products;
    } catch (error) {
      throw error; // Handle error appropriately
    }
  }

  async addProduct(name, price, description, category, image, stock) {
    try {
      const newProduct = await prisma.product.create({
        data: {
          name,
          price,
          description,
          category,
          image,
          stock,
        },
      });
      return newProduct;
    } catch (error) {
      throw error; // Handle error appropriately
    }
  }

  async getProductById(productId) {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });
      return product;
    } catch (error) {
      throw error; // Handle error appropriately
    }
  }

  async updateProduct(productId, updatedData) {
    try {
      const updatedProduct = await prisma.product.update({
        where: {
          id: productId,
        },
        data: updatedData,
      });
      return updatedProduct;
    } catch (error) {
      throw error; // Handle error appropriately
    }
  }

  async deleteProduct(productId) {
    try {
      const deletedProduct = await prisma.product.delete({
        where: {
          id: productId,
        },
      });
      return deletedProduct;
    } catch (error) {
      throw error; // Handle error appropriately
    }
  }

  // New function to get a product by name
  async getProductByName(productName) {
    try {
      const product = await prisma.product.findFirst({
        where: {
          name: productName,
        },
      });
      return product;
    } catch (error) {
      throw error; // Handle error appropriately
    }
  }
}

module.exports = new ProductService();
