const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },          // Name of the product
    description: { type: String, required: true },   // Detailed description of the product
    price: { type: Number, required: true },         // Price of the product
    category: { type: String, required: true },      // Category to which the product belongs
    image: { type: String },                          // URL or path to the product's image (optional)
    stock: { type: Number, required: true, default: 0 }, // Quantity of the product available in stock
    dateAdded: { type: Date, default: Date.now },    // Date the product was added
    tags: [{ type: String }]                          // Array of tags for categorization or search (optional)
  },
  {
    collection: "ProductData",
  }
);

mongoose.model("ProductData", ProductSchema);
