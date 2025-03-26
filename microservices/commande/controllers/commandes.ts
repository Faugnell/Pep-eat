import { Request, Response } from 'express';
const commandesService = require('../services/commandes');

function list(req:Request, res:Response) {
  const commandes = commandesService.findAll();
  res.status(200).json(commandes);
}

function read(req:Request, res:Response) {
  const CommandId = req.params.id;
  const Command = commandesService.find(CommandId);
  if (Command)
    res.status(200).json(Command);
  else
    res.status(404).json({ message: "Commande non trouvé" });
}

function create(req:Request, res:Response) {
  const datas = req.body;
  const createdCommand = commandesService.create(datas);
  if (createdCommand)
    res.status(201).json({ message: "Commande créé" });
  else
    res.status(400).json({ message: "Erreur lors de l'insertion" });
}

function update(req:Request, res:Response) {
  const CommandId = req.params.id;
  const datas = req.body;
  const updatedCommand = commandesService.update(CommandId, datas);
  if (updatedCommand) {
    res.status(200).json({ message: "Commande édité" });
  } else {
    res.status(400).json({ message: "Erreur lors de l'édition" });
  }
}

function remove(req:Request, res:Response) {
  const CommandId = req.params.id;
  const removedCommand = commandesService.remove(CommandId);
  if (removedCommand) {
    res.status(200).json({ message: "Commande supprimé" });
  } else {
    res.status(400).json({ message: "Erreur lors de la suppression" });
  }
}

module.exports = {
  list,
  read,
  create,
  update,
  remove
};
