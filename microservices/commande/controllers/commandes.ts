import { Request, Response } from 'express';
import { isValidMongoId } from '../utils/functions'

const commandesService = require('../services/commandes');

// * ==================================================
// * ==================   READ ALL   ==================
// * ==================================================

async function list(req: Request, res: Response) {
  const commandes = await commandesService.findAll();
  res.status(200).json({
    code: 200,
    ok: true,
    message: `${commandes.length} trouvée(s) !`,
    data: commandes,
  });
}

// * ==================================================
// * =================   READ USERS   =================
// * ==================================================

async function listForUser(req: Request, res: Response) {
  const commandes = await commandesService.findForUser(req.params.id);
  res.status(200).json({
    code: 200,
    ok: true,
    message: `${commandes.length} trouvée(s) !`,
    data: commandes,
  });
}

// * ==================================================
// * ====================   READ   ====================
// * ==================================================

async function read(req: Request, res: Response) {
  if (isValidMongoId(String(req.params.id))) {
    const commande = await commandesService.find(req.params.id);
    if (commande._id === undefined) {
      res.status(200).json({
        code: 200,
        ok: true,
        message: `Aucune commande trouvée avec l'id: ${req.params.id} !`,
        data: {},
      });
    } else {
      res.status(200).json({
        code: 200,
        ok: true,
        message: `${commande._id} trouvée !`,
        data: commande,
      });
    }
  } else {
    res.status(400).json({
      code: 400,
      ok: false,
      error: `${req.params.id} is not a valid ID !`,
    });
  }
}

// * ==================================================
// * ===================   CREATE   ===================
// * ==================================================

async function create(req: Request, res: Response) {
  //TODO Check if body valid
  const newCommande = await commandesService.create({
    "user_id": req.body.user_id,
    "restaurant_id": req.body.restaurant_id,
    "billing_details": req.body.billing_details,
    "date": req.body.date,
    "price": req.body.price,
    "promotions": req.body.promotions,
    "status": req.body.status,
    "comment": req.body.comment
  })
  if(newCommande._id){
    res.status(200).json({
      code: 200,
      ok: true,
      message: `${newCommande._id} créée avec succés !`,
      data: newCommande,
    });
  } else {
    res.status(400).json({
      code: 400,
      ok: false,
      error: newCommande.errors,
    });
  }
}

// * ==================================================
// * ===================   UPDATE   ===================
// * ==================================================

async function update(req: Request, res: Response) {
  if (isValidMongoId(String(req.params.id))) {
    const updatedCommande = await commandesService.update(req.params.id, req.body)
    res.status(200).json({
      code: 200,
      ok: true,
      message: `${updatedCommande._id} mis à jour avec succés !`,
      data: updatedCommande,
    });
  } else {
    res.status(400).json({
      code: 400,
      ok: false,
      error: `${req.params.id} is not a valid ID !`,
    });
  }
}

// * ==================================================
// * ===================   DELETE   ===================
// * ==================================================

async function remove(req: Request, res: Response) {
  if (isValidMongoId(String(req.params.id))) {
    const commandes = await commandesService.remove(req.params.id);
    if (commandes.deletedCount === 0) {
      res.status(200).json({
        code: 200,
        ok: true,
        message: `Aucune commande correspondant à cet ID: ${req.params.id}`,
        data: {},
      });
    } else {
      res.status(200).json({
        code: 200,
        ok: true,
        message: `${req.params.id} supprimée avec succés !`,
        data: commandes,
      });
    }
  } else {
    res.status(400).json({
      code: 400,
      ok: false,
      error: `${req.params.id} is not a valid ID !`,
    });
  }
}

module.exports = {
  list,
  listForUser,
  read,
  create,
  update,
  remove
};
