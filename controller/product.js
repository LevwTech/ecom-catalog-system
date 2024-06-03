const ProductService = require('../service/product');
const { getImageUrl } = require('../utils/imageService');
const { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_NUMBER } = require('../config/constants');

class ProductController {
  static async createProduct(req, res) {
    try {
      const images = [];
      for (const image of req.files) images.push(getImageUrl(image.key));
      const product = await ProductService.createProduct({ ...req.body, images });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getProduct(req, res) {
    try {
      const productId = req.params.id;
      const product = await ProductService.getProduct(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const updateData = req.body;
      const updatedProduct = await ProductService.updateProduct(productId, updateData);
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const productId = req.params.id;
      const deletedProduct = await ProductService.deleteProduct(productId);
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(deletedProduct);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getProducts(req, res) {
    try {
      let { pageNumber = DEFAULT_PAGE_NUMBER, pageSize = DEFAULT_PAGE_SIZE } = req.query;
      pageNumber = parseInt(pageNumber);
      pageSize = parseInt(pageSize);
      const products = await ProductService.getProducts(pageNumber, pageSize);
      res.json(products);
    } catch (error) {
      console.error('Error getting products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async searchProducts(req, res) {
    try {
      const searchQuery = req.query.searchQuery;
      const products = await ProductService.searchProducts(searchQuery);
      res.json(products);
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = ProductController;
