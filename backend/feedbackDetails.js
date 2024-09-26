const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "Feedback",
  }
);

mongoose.model("Feedback", FeedbackSchema);
