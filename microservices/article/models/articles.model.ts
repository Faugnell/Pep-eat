// models/article.model.ts
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: false,
    trim: true
  },
  nutriscore: {
    type: String,
    required: false,
    enum: ['A', 'B', 'C', 'D', 'E']
  },
  available: {
    type: Boolean,
    required: false,
    default: true
  },
  image_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Media',
    required: false
  }
}, {
  versionKey: false,
});

export const Article = mongoose.model("Article", articleSchema);
