// services/articles.service.ts
import { Article } from "../models/articles.model";

export async function findAll() {
  return await Article.find();
}

export async function findByRestaurant(restaurantId: string) {
  return await Article.find({ restaurant_id: restaurantId });
}

module.exports = {
    findAll,
    findByRestaurant
};