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
    coordinates: {
      type: [],
      required: true
    }
  },
  votes: {
    type: Number,
    default: 0
  },
  voters: [String],
  createdDate: {
    type: Date,
    expires: 86400,
    default: Date.now,
  },
  boosted: {
    type: Boolean,
    default: false
  }
});

// Converts a doc to something we can store in redis later on.
QuoteSchema.statics.toAPI = (doc) => ({
  quoteCopy: doc.quoteCopy,
  owner: doc.owner,
  location: doc.location,
  votes: doc.votes,
  _id: doc._id,
});

QuoteSchema.index({ location: '2dsphere' });

QuoteSchema.statics.findByLocation = (longitude, latitude, callback) => {
    // Mongoose has built-in tools for location-based objects.
    const search = {
      location: {
        $near: {
          $maxDistance: 100,
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
        },
      },
    };

    return QuoteModel.find(search).sort({ bosted: -1, votes: 1 }).exec(callback);
};

QuoteSchema.statics.findByID = (quoteId, callback) => {
  const search = {
    // Convert the string ownerId to an object id
    _id: quoteId
  };

  return QuoteModel.findOne(search).exec(callback);
};

QuoteSchema.statics.findByOwner = (owner, callback) => {
  return QuoteModel.find({owner}).sort({createdDate: -1}).exec(callback);
};

QuoteModel = mongoose.model('Quote', QuoteSchema);

module.exports = QuoteModel;
