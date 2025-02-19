const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    rating: String,
    scrapedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
