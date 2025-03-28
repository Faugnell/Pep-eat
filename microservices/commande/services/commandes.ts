import { commandeType } from "../models/commandes";

const Commande = require("../models/commandes")

// * ==================================================
// * ==================   READ ALL   ==================
// * ==================================================
async function findAll() {
  try {
    const commandes:[commandeType] = await Commande.find({});
    return commandes;
  } catch (err) {
    console.log("Erreur lors de la récupération des commandes :", err);
    return err
  }
}

// * ==================================================
// * ====================   READ   ====================
// * ==================================================
async function find(id:string) {
  try {
    const commandes:commandeType = await Commande.find({_id: id});
    return commandes;
  } catch (err) {
    console.log("Erreur lors de la récupération des commandes :", err);
    return err
  }
}

// * ==================================================
// * ===================   CREATE   ===================
// * ==================================================
async function create(newCommand:commandeType) {
  const newCommande = new Commande({
    "user_id": newCommand.user_id,
    "restaurant_id": newCommand.restaurant_id,
    "plat_ids": newCommand.plat_ids,
    "date": newCommand.date,
    "status": newCommand.status,
    "note": newCommand.note
  })
  try {
    let output:commandeType = await newCommande.save()
    return output
  } catch (err){
    console.log("Erreur lors de la création de la commande:", err)
    return err
  }
  
}
// * ==================================================
// * ===================   UPDATE   ===================
// * ==================================================
async function update(id:string, updatedCommand:commandeType) {
  try {
    const docs = await Commande.findOneAndUpdate({_id:id}, updatedCommand)
    return docs
  } catch(err) {
    console.log("Erreur lors de l'update", err)
    return err
  }
}

// * ==================================================
// * ===================   DELETE   ===================
// * ==================================================
async function remove(id:any) {
  try {
    const commandes = await Commande.deleteOne({_id: id});
    return commandes;
  } catch (err) {
    console.log("Erreur lors de la récupération des commandes :", err);
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
