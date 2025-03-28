import { Request, Response } from 'express';
import { isValidMongoId } from '../utils/functions'

const commandesService = require('../services/commandes');

async function list(req: Request, res: Response) {
  const commandes = await commandesService.findAll();
  res.status(200).json(commandes);
}

async function read(req: Request, res: Response) {
  if (isValidMongoId(String(req.params.id))) {
    const commandes = await commandesService.find(req.params.id);
    res.status(200).json(commandes);
  } else {
    res.status(400).json({ messsage: `${req.params.id} is not a valid ID` })
  }
}

async function create(req: Request, res: Response) {
  //TODO Check if body valid
  const newCommande = await commandesService.create({
    "user_id": req.body.user_id,
    "restaurant_id": req.body.restaurant_id,
    "plat_ids": req.body.plat_ids,
    "date": req.body.date,
    "status": req.body.status,
    "note": req.body.note
  })
  res.status(200).json({ message: newCommande._id })
}

async function update(req: Request, res: Response) {
  const updatedCommande = await commandesService.update(req.params.id, req.body)
  res.status(200).json({message: updatedCommande})
}

async function remove(req: Request, res: Response) {
  if (isValidMongoId(String(req.params.id))) {
    const commandes = await commandesService.remove(req.params.id);
    console.log(commandes)
    if (commandes.deletedCount === 0) {
      res.status(400).json({ message: `Aucune commande correspondant à cet ID: ${req.params.id}` });
    } else {
      res.status(200).json({ message: `Commande ${req.params.id} supprimé`, validation: commandes });
    }
  } else {
    res.status(400).json({ messsage: `${req.params.id} is not a valid ID` })
  }
}

module.exports = {
  list,
  read,
  create,
  update,
  remove
};
