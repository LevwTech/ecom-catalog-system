const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  images: {
    type: [String],
    required: true
  },
  customAttributes: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true, toJSON: { virtuals: true } });

productSchema.index({ name: 'text', 'customAttributes.*': 'text' });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
