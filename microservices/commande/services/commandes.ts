const Commande = require("../models/commandes")

async function findAll() {
  try {
    const commandes = await Commande.find({});
    return commandes;
  } catch (err) {
    console.log("Erreur lors de la récupération des commandes :", err);
    return err
  }
}

async function find(id:string) {
  try {
    const commandes = await Commande.find({_id: id});
    return commandes;
  } catch (err) {
    console.log("Erreur lors de la récupération des commandes :", err);
    return err
  }
}

async function create(newCommand:any) {
 
  const newCommande = new Commande({
    "user_id": newCommand.user_id,
    "restaurant_id": newCommand.restaurant_id,
    "plat_ids": newCommand.plat_ids,
    "date": newCommand.date,
    "status": newCommand.status,
    "note": newCommand.note
  })
  try {
    let output = await newCommande.save()
    return output
  } catch (err){
    console.log("Erreur lors de la création de la commande:", err)
    return err
  }
  
}

function update(id:number, updatedCommand:any) {

}

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
