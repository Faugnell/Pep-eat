// services/articles.service.ts
import { Article } from "../models/articles.model";

export async function findAll() {
  return await Article.find();
}

module.exports = {
    findAll
};