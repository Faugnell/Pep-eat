import mongoose from "mongoose";
import { panierType } from "../models/paniers";
const Panier = require("../models/paniers")

// * ==================================================
// * ==================   READ ALL   ==================
// * ==================================================

async function findAll() {
  try {
    const paniers: panierType[] = await Panier.find({});
    return paniers;
  } catch (err) {
    console.log("Erreur lors de la récupération des paniers :", err);
    return err
  }
}


// * ==================================================
// * ====================   READ   ====================
// * ==================================================

async function find(id: string) {
  try {
    const panier: panierType[] = await Panier.find({user_id: new mongoose.Types.ObjectId(id)});
    return panier[0] || {};
  } catch (err) {
    console.log("Erreur lors de la récupération du panier :", err);
    return err
  }
}

// * ==================================================
// * ===================   CREATE   ===================
// * ==================================================

async function create(newPanierData: panierType) {
  const newPanier = new Panier({
    "userId": newPanierData.userId,
    "articles": newPanierData.articles,
    "prixTotal": newPanierData.prixTotal
  })
  try {
    let output: panierType = await newPanier.save()
    return output
  } catch (err) {
    console.log("Erreur lors de la création du Panier:", err)
    return err
  }

}
// * ==================================================
// * ===================   UPDATE   ===================
// * ==================================================

async function update(id: string, updatedPanier: panierType) {
  try {
    const exists = await Panier.countDocuments({ userId: new mongoose.Types.ObjectId(id)})
    if(exists > 0) {
      return await Panier.findOneAndUpdate({ userId: new mongoose.Types.ObjectId(id) }, updatedPanier)
    }
    else {
      const newPanier = new Panier({
        "userId": new mongoose.Types.ObjectId(id),
        "articles": updatedPanier.articles,
        "prixTotal": updatedPanier.prixTotal
      })
      try {
        let output: panierType = await newPanier.save()
        return output
      } catch (err) {
        console.log("Erreur lors de la création du Panier:", err)
        return err
      }
    }
  } catch (err) {
    console.log("Erreur lors de l'update du panier", err)
    return err
  }
}

// * ==================================================
// * ===================   DELETE   ===================
// * ==================================================

async function remove(id: string) {
  try {
    const deletedPanier = await Panier.deleteOne({ user_id:  new mongoose.Types.ObjectId(id) });
    return deletedPanier;
  } catch (err) {
    console.log("Erreur lors de la suppression du panier :", err);
    return err
  }
}

module.exports = {
  findAll,
  find,
  create,
  update,
  remove,
};
