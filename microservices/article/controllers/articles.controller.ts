import { Request, Response } from 'express';
const articlesService = require('../services/articles.service');

export async function list(req: Request, res: Response) {
  try {
    const articles = await articlesService.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des articles", error });
  }
}

export async function listByRestaurant(req: Request, res: Response) {
  try {
    const { restaurantId } = req.params;
    const articles = await articlesService.findByRestaurant(restaurantId);
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des articles du restaurant", error });
  }
}

function read(req:Request, res:Response) {
}
 
function create(req:Request, res:Response) {
}
 
function update(req:Request, res:Response) {
}
 
function remove(req:Request, res:Response) {
}
 
module.exports = {
  list,
  read,
  create,
  update,
  remove,
  listByRestaurant
};