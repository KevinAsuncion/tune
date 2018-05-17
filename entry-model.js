'use strict';

const mongoose = require('mongoose');
const moment = require('moment');

mongoose.Promise = global.Promise;

const entrySchema = mongoose.Schema({
    image_url: {type: String, required: true }, 
    photo_meaning: {type: String, required: true},
    grateful: { type: String, required: true },
    best_self: { type: String, required: true },
    created_date: {type: Date, default: Date.now()},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

entrySchema.methods.serialize = function() {
    return {
        id: this._id,
        image_url: this.image_url, 
        photo_meaning: this.photo_meaning, 
        grateful: this.grateful, 
        best_self: this.best_self,
        created_date: this.created_date,
        user: this.user
    };
};


const Entry = mongoose.model('Entry', entrySchema);

module.exports = { Entry };


