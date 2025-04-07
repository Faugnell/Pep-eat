import { Request, Response } from 'express';
import { isValidMongoId } from '../utils/functions'

const paniersService = require('../services/paniers');

// * ==================================================
// * ==================   READ ALL   ==================
// * ==================================================

async function list(req: Request, res: Response) {
  const paniers = await paniersService.findAll();
  res.status(200).json({
    code: 200,
    ok: true,
    message: `${paniers.length} trouvée(s) !`,
    data: paniers,
  });
}

// * ==================================================
// * ====================   READ   ====================
// * ==================================================

async function read(req: Request, res: Response) {
  if (isValidMongoId(String(req.params.id))) {
    const paniers = await paniersService.find(req.params.id);
    if (paniers._id === undefined) {
      res.status(200).json({
        code: 200,
        ok: true,
        message: `Aucune paniers trouvée avec l'id: ${req.params.id} !`,
        data: {},
      });
    } else {
      res.status(200).json({
        code: 200,
        ok: true,
        message: `${paniers._id} trouvée !`,
        data: paniers,
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
  const newPaniers = await paniersService.create({
    "user_id": req.body.user_id,
    "articles": req.body.articles,
    "prixTotal": req.body.prixTotal
  })
  if(newPaniers._id){
    res.status(200).json({
      code: 200,
      ok: true,
      message: `${newPaniers._id} créée avec succés !`,
      data: newPaniers,
    });
  } else {
    res.status(400).json({
      code: 400,
      ok: false,
      error: newPaniers.errmsg  ,
    });
  }
}

// * ==================================================
// * ===================   UPDATE   ===================
// * ==================================================

async function update(req: Request, res: Response) {
  if (isValidMongoId(String(req.params.id))) {
    const updatedPanier = await paniersService.update(req.params.id, req.body)
    res.status(200).json({
      code: 200,
      ok: true,
      message: `${req.params.id} mis à jour avec succés !`,
      data: updatedPanier,
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
    const paniers = await paniersService.remove(req.params.id);
    if (paniers.deletedCount === 0) {
      res.status(200).json({
        code: 200,
        ok: true,
        message: `Aucun panier correspondant à cet ID: ${req.params.id}`,
        data: {},
      });
    } else {
      res.status(200).json({
        code: 200,
        ok: true,
        message: `${req.params.id} supprimé avec succés !`,
        data: paniers,
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
  read,
  create,
  update,
  remove
};
