import { Request, Response } from 'express';
const articlesService = require('../services/articles');

export async function list(req: Request, res: Response) {
  try {
    const articles = await articlesService.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des articles", error });
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
  remove
};