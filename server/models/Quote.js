const mongoose = require('mongoose');

let QuoteModel = {};

const QuoteSchema = new mongoose.Schema({
  quoteCopy: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: String,
    required: true,
  },
  location: {
    type: { type: String },
    coordinates: [],
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// Converts a doc to something we can store in redis later on.
QuoteSchema.statics.toAPI = (doc) => ({
  quoteCopy: doc.quoteCopy,
  owner: doc.owner,
  location: doc.location,
  _id: doc._id,
});

QuoteSchema.index({ location: '2dsphere' });

QuoteModel = mongoose.model('Quote', QuoteSchema);

module.exports = QuoteModel;
