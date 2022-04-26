const models = require('../models');
const QuoteModel = require('../models/Quote');

const { Quote } = models;

// Add a quote tto the MongoDB.
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
    return res.status(201).json(newQuote);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured.' });
  }
};

// Get quotes within a certain distance (50m) from the database.
const getQuotes = async (req, res) => {
  const latitude = parseFloat(req.query.latitude);
  const longitude = parseFloat(req.query.longitude);

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Location has not been found!' });
  }

  await QuoteModel.findByLocation(longitude, latitude, (err, quotes) => {
    if (err) {
      return res.status(400).json({ error: 'An error occured!' });
    }

    return res.json({ quotes });
  });
  return false;
};

// Get the quotes made by the current account.
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
  return false;
};

// Add a vote to a specified quote.
const addVote = async (req, res) => {
  const quoteID = `${req.body.quoteID}`;
  const voteValue = `${req.body.voteValue}`;

  // Associated account is listed as the current session account holder.
  const username = `${req.session.account.username}`;

  if (!quoteID || !voteValue) {
    return res.status(400).json({ error: 'All attributes are required!' });
  }

  await QuoteModel.findByID(quoteID, async (err, quote) => {
    if (err) {
      return res.status(400).json({ error: 'An error occured!' });
    }

    if (quote.voters.includes(username)) {
      return res.status(400).json({ error: "You've already voted on this quote!" });
    }

    // Try to update the vote tally and voters list in the DB.
    try {
      const currentQuote = quote;

      if (voteValue === 'true') {
        currentQuote.votes++;
        currentQuote.voters.push(username);
      } else {
        currentQuote.votes--;
        currentQuote.voters.push(username);
      }
      await currentQuote.save();

      return res.status(200);
    } catch (error) {
      return res.status(400).json({ error: 'An error occurred!' });
    }
  });
  return false;
};

// Mark a quote as boosted.
const boostQuote = async (req, res) => {
  const quoteID = `${req.body.quoteID}`;

  if (!quoteID) {
    return res.status(400).json({ error: 'All attributes are required!' });
  }

  await QuoteModel.findByID(quoteID, async (err, quote) => {
    if (err) {
      return res.status(400).json({ error: 'An error occured!' });
    }

    try {
      const currentQuote = quote;

      if (quote.boosted === true) {
        return res.status(400).json({ error: 'This quote is already boosted!' });
      }

      currentQuote.boosted = true;
      await currentQuote.save();

      return res.status(200);
    } catch (error) {
      return res.status(400).json({ error: 'An error occurred!' });
    }
  });
  return false;
};

module.exports = {
  makeQuote,
  getQuotes,
  getOwnerQuotes,
  addVote,
  boostQuote,
};
