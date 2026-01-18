const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: Number, required: true }, // Selling price (calculated or base)
    originalPrice: { type: Number }, // MSRP
    discountPercentage: { type: Number }, // e.g., 20
    isOnOffer: { type: Boolean, default: false },
    offerLabel: { type: String }, // e.g., "20% OFF"
    sizes: [{ type: String }], // e.g., ['30ml', '50ml', '100ml']
    images: [{ type: String, required: true }] // Array of image URLs
});

module.exports = mongoose.model('Product', productSchema);
