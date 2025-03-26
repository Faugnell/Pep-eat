import { Request, Response } from 'express';
const commandesService = require('../services/commandes');

function list(req:Request, res:Response) {
  const commandes = commandesService.findAll();
  res.status(200).json(commandes);
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
