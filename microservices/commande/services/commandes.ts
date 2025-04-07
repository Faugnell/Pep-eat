import mongoose from "mongoose";
import { commandeType } from "../models/commandes";
const Commande = require("../models/commandes")

// * ==================================================
// * ==================   READ ALL   ==================
// * ==================================================

async function findAll() {
  try {
    const commandes: commandeType[] = await Commande.aggregate([
      {
        $lookup: {
          from: "restaurants",
          localField: "restaurant_id",
          foreignField: "_id",
          as: "restaurant_data"
        },
      },
      {
        $unwind: {
          path: "$restaurant_data",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "utilisateurs",
          localField: "user_id",
          foreignField: "_id",
          as: "user_data"
        }
      },
      {
        $unwind: {
          path: "$user_data",
          preserveNullAndEmptyArrays: true
        }
      }
    ]);
    return commandes;
  } catch (err) {
    console.log("Erreur lors de la récupération des commandes :", err);
    return err
  }
}

// * ==================================================
// * =================   READ USERS   =================
// * ==================================================

async function findForUser(filter: string) {
  try {
    const commandes: commandeType[] = await Commande.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(filter)
        }
      },
      {
        $lookup: {
          from: "restaurants",
          localField: "restaurant_id",
          foreignField: "_id",
          as: "restaurant_data"
        },
      },
      {
        $unwind: {
          path: "$restaurant_data",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "utilisateurs",
          localField: "user_id",
          foreignField: "_id",
          as: "user_data"
        }
      },
      {
        $unwind: {
          path: "$user_data",
          preserveNullAndEmptyArrays: true
        }
      }
    ]);
    return commandes;
  } catch (err) {
    console.log("Erreur lors de la récupération des commandes :", err);
    return err
  }
}

// * ==================================================
// * ====================   READ   ====================
// * ==================================================

async function find(id: string) {
  try {
    const commande: commandeType[] = await Commande.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: "restaurants",
          localField: "restaurant_id",
          foreignField: "_id",
          as: "restaurant_data"
        },
      },
      {
        $unwind: {
          path: "$restaurant_data",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "utilisateurs",
          localField: "user_id",
          foreignField: "_id",
          as: "user_data"
        }
      },
      {
        $unwind: {
          path: "$user_data",
          preserveNullAndEmptyArrays: true
        }
      }
    ]);
    return commande[0] || {};
  } catch (err) {
    console.log("Erreur lors de la récupération des commandes :", err);
    return err
  }
}

// * ==================================================
// * ===================   CREATE   ===================
// * ==================================================

async function create(newCommand: commandeType) {
  const newCommande = new Commande({
    "user_id": newCommand.user_id,
    "restaurant_id": newCommand.restaurant_id,
    "billing_details": newCommand.billing_details,
    "date": newCommand.date,
    "price": newCommand.price,
    "promotions": newCommand.promotions,
    "status": newCommand.status,
    "comment": newCommand.comment
  })
  try {
    let output: commandeType = await newCommande.save()
    return output
  } catch (err) {
    console.log("Erreur lors de la création de la commande:", err)
    return err
  }
}

// * ==================================================
// * ===================   UPDATE   ===================
// * ==================================================

async function update(id: string, updatedCommand: commandeType) {
  try {
    const docs = await Commande.findOneAndUpdate({ _id: id }, updatedCommand)
    return docs
  } catch (err) {
    console.log("Erreur lors de l'update", err)
    return err
  }
}

// * ==================================================
// * ===================   DELETE   ===================
// * ==================================================

async function remove(id: string) {
  try {
    const commandes = await Commande.deleteOne({ _id: id });
    return commandes;
  } catch (err) {
    console.log("Erreur lors de la récupération des commandes :", err);
    return err
  }
}

module.exports = {
  findAll,
  findForUser,
  find,
  create,
  update,
  remove,
};