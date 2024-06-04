const Product = require('../model/product');
const redis = require('../config/redis');
const { getProductCacheKey, getProductsCacheKey, invalidateProductCache, deleteProductsCache } = require('../utils/cache');
const { GET_PRODUCTS_FIELDS, CACHE_DURATION, MAX_SEARCH_RESULTS } = require('../config/constants');
const { deleteImages } = require('../utils/imageService');
class ProductService {
  static async createProduct(productData) {
    try {
      const product = await Product.create(productData);
      console.log('Product created successfully:', product);
      await deleteProductsCache();
      return product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  static async getProduct(productId) {
    try {
      const cacheKey = getProductCacheKey(productId);
      const cachedProduct = await redis.get(cacheKey);
      if (cachedProduct) {
        console.log('Product retrieved from cache');
        return JSON.parse(cachedProduct);
      }
      const product = await Product.findById(productId);
      await redis.set(cacheKey, JSON.stringify(product), 'EX', CACHE_DURATION);
      if (!product) {
        console.log('Product not found');
        return null;
      }
      console.log('Product found:', product);
      return product;
    } catch (error) {
      console.error('Error finding product by ID:', error);
      throw error;
    }
  }

  static async updateProduct(productId, updateData) {
    try {
      const cacheKey = getProductCacheKey(productId);
      const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
      if (!product) {
        console.log('Product not found');
        return null;
      }
      console.log('Product updated successfully:', product);
      await invalidateProductCache(cacheKey);
      return product;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  static async deleteProduct(productId) {
    try {
      const cacheKey = getProductCacheKey(productId);
      const product = await Product.findByIdAndDelete(productId);
      if (!product) {
        console.log('Product not found');
        return null;
      }
      await deleteImages(product.images);
      await invalidateProductCache(cacheKey);
      console.log('Product deleted successfully:', product);
      return product;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  static async getProducts(pageNumber, pageSize) {
    try {
      const cacheKey = getProductsCacheKey(pageNumber, pageSize);
      const cachedProducts = await redis.get(cacheKey);
      if (cachedProducts) {
        console.log('Products retrieved from cache');
        const { products, totalCount } = JSON.parse(cachedProducts);
        return { products, totalCount };
      }
      
      const skip = (pageNumber - 1) * pageSize;
      const [products, totalCount] = await Promise.all([
        Product.find({}, GET_PRODUCTS_FIELDS).skip(skip).limit(pageSize).sort({ createdAt: -1 }),
        Product.countDocuments({})
      ]);
      
      await redis.set(cacheKey, JSON.stringify({ products, totalCount }), 'EX', CACHE_DURATION);
      
      return { products, totalCount };
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  }

  static async searchProducts(searchQuery) {
    try {
      const regex = new RegExp(searchQuery, 'i');
      const products = await Product.find({ name: { $regex: regex } }).limit(MAX_SEARCH_RESULTS);
      return products;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
}

module.exports = ProductService;