import { Types } from 'mongoose'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export type commandeType = {
  user_id: Types.ObjectId,
  restaurant_id: Types.ObjectId,
  plat_ids: [Types.ObjectId,],
  date: Date,
  status: 'en cours'|'livrée'|'annulée',
  note: String,
}

const commandeSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
    required: true
  },
  plat_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plats",
      required: true
    }
  ],
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['en cours', 'livrée', 'annulée'],
    default: 'en cours'
  },
  note: {
    type: String,
    trim: true
  }
}, {versionKey: false});

module.exports = mongoose.model('Commande', commandeSchema);