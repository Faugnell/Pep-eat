// services/articles.service.ts
import { Article } from "../models/articles.model";

export async function findAll() {
  return await Article.find();
}

export async function findByRestaurant(restaurantId: string) {
  return await Article.find({ restaurant_id: restaurantId });
}

export async function findByCategory(category: string) {
  return await Article.find({ category: category})
}

export async function findById(id: string) {
  return await Article.findById({ id });
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