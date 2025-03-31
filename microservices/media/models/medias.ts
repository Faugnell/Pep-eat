const mongoose = require('mongoose');

module.exports = mongoose.model('Media', new mongoose.Schema({
    buffer: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
}), 'medias');