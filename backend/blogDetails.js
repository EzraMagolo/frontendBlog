const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },       // Title of the blog post or blog card
    body: { type: String },                        // Main content of the blog post
    tag: { type: String, required: true },         // Tag or category of the blog post or blog card
    date: { type: Date, default: Date.now },       // Date of the blog post or blog card
    userName: { type: String, required: true },    // Author's name
    userAvatar: { type: String, required: true },  // URL to the author's avatar image
    image: { type: String },                       // URL to the blog post's image
    tags: [{ type: String, required: true }]       // Array of tags (from TagList component)
  },
  {
    collection: "BlogData",
  }
);

mongoose.model("BlogData", BlogSchema);
