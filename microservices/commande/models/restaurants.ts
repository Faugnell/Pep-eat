import { Types } from 'mongoose'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export type restaurantsType = {
    "_id": Types.ObjectId,
    "nom": string,
    "description": string,
    "adresse": string,
    "telephone": string,
    "horaires": string,
    "id_proprietaire": Types.ObjectId,
    "siret": string,
    "type_cuisine": string
  }

const restaurantSchema = new Schema({
  nom: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "",
  },
  adresse: [
    {
      type: String,
      required: true
    }
  ],
  telephone: {
    type: String,
    required: true
  },
  horaires: {
    type: String,
    default: 'NA'
  },
  id_proprietaire: {
    type: Types.ObjectId,
    require: true
  },
  siret: {
    type: String,
    require: true,
  },
  type_cuisine: {
    type: String,
    require: true
  }
}, {versionKey: false});

module.exports = mongoose.model('Restaurant', restaurantSchema);