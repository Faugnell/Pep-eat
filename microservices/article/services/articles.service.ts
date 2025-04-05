// services/articles.service.ts
import { Article } from "../models/articles.model";
import mongoose from "mongoose"; 

export async function findAll() {
  return await Article.find();
}

export async function findByRestaurant(restaurantId: string) {
  return await Article.find({ restaurant_id: new mongoose.Types.ObjectId(restaurantId) });
}

export async function findByCategory(category: string) {
  return await Article.find({ category: category})
}

export async function findById(articleId: string) {
  return await Article.findById({ _id: articleId});
}

async function create(data: any) {
  const article = new Article(data);
  return await article.save();
}

async function updateById(id: string, data: any) {
  return await Article.findByIdAndUpdate(id, data, { new: true });
}

async function deleteById(id: string) {
  return await Article.findByIdAndDelete(id);
}

module.exports = {
    findAll,
    findByRestaurant,
    findByCategory,
    findById,
    create,
    updateById,
    deleteById
};