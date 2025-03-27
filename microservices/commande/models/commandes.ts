const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commandeSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  restaurant_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  plat_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
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
});

module.exports = mongoose.model('Commande', commandeSchema);