const mongoose = require('mongoose');

module.exports = mongoose.model('Restaurant', new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    adresse: {
        type: String,
        required: true,
        trim: true
    },
    telephone: {
        type: String,
        required: false
    },
    horaires: {
        type: String,
        required: false
    },
    id_proprietaire: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    siret: {
        type: String,
        required: true,
        trim: true
    },
    type_cuisine: {
        type: String,
        required: true,
        trim: true
    },
    sponsorise: {
        type: Boolean,
        required: false,
        default: false
    }
}, {
    versionKey: false,
}));