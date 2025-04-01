import { Types } from 'mongoose'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export type commandeType = {
  user_id: Types.ObjectId,
  restaurant_id: Types.ObjectId,
  plat_ids: [Types.ObjectId,],
  date: Date,
  price: number,
  promotions: {type: string, value: number, code: string},
  status: 'en cours'|'livrée'|'annulée',
  note: String,
}
const promotionSchema = new Schema({
  type: {
    type: String,
    enum: ['percentage', 'amount'],
    default: 'percentage'
  },
  value: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0
  },
  code: {
    type: String,
    required: true
  }
})

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
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  promotions: [
    {
      type: promotionSchema,
      required: false
    }
  ],
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