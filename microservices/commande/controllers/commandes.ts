import { Request, Response } from 'express';
import { isValidMongoId } from '../utils/functions'
const commandesService = require('../services/commandes');

async function list(req:Request, res:Response) {
  const commandes = await commandesService.findAll();
  res.status(200).json(commandes);
}

async function read(req:Request, res:Response) {
  if(isValidMongoId(String(req.params.id))){
    const commandes = await commandesService.find(req.params.id);
    res.status(200).json(commandes);
  } else {
    res.status(400).json({messsage: `${req.params.id} is not a valid ID`})
  }
  
}

async function create(req:Request, res:Response) {
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
