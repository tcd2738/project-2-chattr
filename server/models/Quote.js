const mongoose = require('mongoose');

let QuoteModel = {};

const QuoteSchema = new mongoose.Schema({
    quoteCopy: {
        type: String, 
        required: true,
        trim: true
    },
    owner: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: null
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

QuoteSchema.statics.toAPI = (doc) => ({
    quoteCopy: doc.quoteCopy,
    owner: doc.owner,
    location: doc.location
});

QuoteModel = mongoose.model('Quote', QuoteSchema);

module.exports = QuoteModel;