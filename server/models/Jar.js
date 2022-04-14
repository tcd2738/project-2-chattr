const mongoose = require('mongoose');

let JarModel = {};

const JarSchema = new mongoose.Schema({
  jarName: {
    type: String,
    required: true,
    trim: true,
  },
  quotes: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// Converts a doc to something we can store in redis later on.
JarSchema.statics.toAPI = (doc) => ({
  jarName: doc.jarName,
  quotes: doc.quotes,
  owner: doc.owner,
  users: doc.users,
});

// Locate jars related to a specific user.
JarSchema.statics.findByUser = (userId, callback) => {
  const search = {
    // Convert the string ownerId to an object id
    userId: mongoose.Types.ObjectId(userId),
  };

  return JarModel.find(search).select('jarName quotes owner').lean().exec(callback);
};

JarModel = mongoose.model('Jar', JarSchema);

module.exports = JarModel;
