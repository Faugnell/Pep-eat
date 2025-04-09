const mongoose = require('mongoose');

module.exports = mongoose.model('Notification', new mongoose.Schema({
    titre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: true,
    },
    utilisateurs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'utilisateurs',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    couleur: {
        type: String,
        required: false
    }
}, {
    versionKey: false,
}));