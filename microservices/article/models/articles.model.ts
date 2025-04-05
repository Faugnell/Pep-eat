// models/article.model.ts
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    _id: String,
    restaurant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true
    },
    name: String,
    description: String,
    price: Number,
    category: String,
    nutriscore: String,
    available: Boolean,
    image_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media',
      required: false
    }
  });

export const Article = mongoose.model("Article", articleSchema);