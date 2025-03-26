// models/article.model.ts
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  _id: String,
  restaurant_id: String,
  name: String,
  description: String,
  price: Number,
  category: String,
  nutriscore: String,
  available: Boolean
});

export const Article = mongoose.model("Article", articleSchema);