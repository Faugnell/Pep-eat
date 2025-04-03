import { Types } from 'mongoose'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export type commandeType = {
  user_id: Types.ObjectId,
  restaurant_id: Types.ObjectId,
  billing_details: [{quantity: number, article_data: articleType}],
  date: Date,
  price: number,
  promotions: {type: string, value: number, code: string},
  status: 'en cours'|'livrée'|'annulée',
  comment: String,
}

type articleType= {
  article_id: string,
  name: string,
  description: string,
  price: number,
  nutriscore: string,
  category: string
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
}, { autoIndex: false })

const platSchema = new Schema({
  article_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  nutriscore: {
    type: String,
    default: "NA"
  },
  category: {
    type: String,
    required: true
  }
}, { autoIndex: false })

const billingdetailSchema = new Schema({
  quantity: {
    type: Number,
    default: 1
  },
  article_data: {
    type: platSchema,
    required: true
  }
}, { autoIndex: false })

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
  billing_details: [{
    type: billingdetailSchema,
    required: true
  }],
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
  comment: {
    type: String,
    trim: true
  }
}, {versionKey: false});

module.exports = mongoose.model('Commande', commandeSchema);