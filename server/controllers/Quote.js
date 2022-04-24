const models = require('../models');
const QuoteModel = require('../models/Quote');

const { Quote } = models;

// Add a quote (with location data) to the MongoDB.
const makeQuote = async (req, res) => {
  const quoteCopy = `${req.body.quoteCopy}`;
  const coordinates = [parseFloat(req.body.location.longitude),
    parseFloat(req.body.location.latitude)];
  // Associated account is listed as the current session account holder.
  const username = `${req.session.account.username}`;

  if (!quoteCopy || !username || !coordinates) {
    return res.status(400).json({ error: 'All attributes are required!' });
  }

  const quoteData = {
    quoteCopy,
    location: {
      type: 'Point',
      coordinates,
    },
    owner: username,
  };

  try {
    const newQuote = new Quote(quoteData);
    await newQuote.save();
    return res.status(201).json(
      { quoteCopy: newQuote.quoteCopy, location: newQuote.location, owner: newQuote.owner, votes: newQuote.votes },
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured.' });
  }
};

// Get quotes within a certain distance (1km) from the database.
const getQuotes = async (req, res) => {
  const latitude = parseFloat(req.query.latitude);
  const longitude = parseFloat(req.query.longitude);

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Location has not been found!' });
  }

  // Mongoose has built-in tools for location-based objects.
  const search = {
    location: {
      $near: {
        $maxDistance: 1000,
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      },
    },
  };

  await QuoteModel.find(search).select('quoteCopy owner location votes createdDate _id').lean().exec((err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occured!' });
    }
    return res.json({ quotes: docs });
  });
  return false;
};

const getOwnerQuotes = async (req, res) => {
  const owner = `${req.session.account.username}`;

  if (!owner) {
    return res.status(400).json({ error: 'All attributes are required!' });
  }

  await QuoteModel.findByOwner(owner, async (err, quotes) => {
    if (err) {
      return res.status(400).json({ error: 'An error occured!' });
    }

    return res.json({ quotes });
  });
}

const addVote = async (req, res) => {
  const quoteID = `${req.body.quoteID}`;
  const voteValue = `${req.body.voteValue}`;

  if (!quoteID || !voteValue) {
    return res.status(400).json({ error: 'All attributes are required!' });
  }

  await QuoteModel.findByID(quoteID, async (err, quote) => {

    if (err) {
      return res.status(400).json({ error: 'An error occured!' });
    }

    try {
      if (voteValue === "true") {
        quote.votes++;
      } else {
        quote.votes--;
      }
      await quote.save();
  
      return res.status(200);
    } catch (error) {
      return res.status(400).json({ error: 'An error occurred.' });
    }
  });
};



module.exports = {
  makeQuote,
  getQuotes,
  getOwnerQuotes,
  addVote
};
