const mongoose = require('mongoose');
const { Schema } = mongoose;

const imagesSchema = new Schema({

    imgName: {
        type: String,
        default: null
    },
    noteID: {
        type: String,
        default: null
    }

}, { versionKey: false });

module.exports = mongoose.model('Images', imagesSchema, 'images');