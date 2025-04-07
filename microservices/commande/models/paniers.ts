import { Types } from 'mongoose'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

type article= {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
export type panierType = {
  userId: Types.ObjectId,
  articles: article[]
  prixTotal: Types.Decimal128
}

const articleSchema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
}, { autoIndex: false })

const panierSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    index: true
  },
  articles: [{
    type: articleSchema,
    required: true
  }],
  prixTotal: {
    type: Types.Decimal128,
    required: true
  }
},
{
  strict: true,
  versionKey: false
});

module.exports = mongoose.model('Panier', panierSchema);