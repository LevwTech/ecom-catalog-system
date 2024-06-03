const redis = require('../config/redis');

const getProductsCacheKey = (page, limit) => {
    return `products:${page}:${limit}`;
}
const getProductCacheKey = (productId) => {
    return `product:${productId}`;
}
const deleteProductsCache = async () => { 
    const pattern = 'products:*';
    const keys = await redis.keys(pattern);
    if (keys.length) {
        await redis.del(keys);
    }
}

const invalidateProductCache = async (cacheKey) => {
    try {
      await redis.del(cacheKey);
      await deleteProductsCache();
      console.log('Product cache invalidated successfully');
    } catch (error) {
      console.error('Error invalidating product cache:', error);
      throw error;
    }
  }
module.exports = { getProductsCacheKey, getProductCacheKey, deleteProductsCache, invalidateProductCache };