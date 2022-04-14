const models = require('../models');
const QuoteModel = require('../models/Quote');

const { Quote } = models;

// Add a quote to the MongoDB.
const makeQuote = async (req, res) => {
    const quoteCopy = `${req.body.quoteCopy}`;
    // Associated account is listed as the current session account holder.
    const username = `${req.session.account.username}`;

    if (!quoteCopy || !username) {
        return res.status(400).json({ error: 'All attributes are required!' });
    }

    const quoteData = {
        quoteCopy: quoteCopy,
        owner: username
    };

    try {
        const newQuote = new Quote(quoteData);
        await newQuote.save();
        return res.status(201).json(
            {quoteCopy: newQuote.quoteCopy, owner: newQuote.owner}
        );
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occured.' });
    }
}

// Add a quote (with location data) to the MongoDB.
const makeLocationQuote = async (req, res) => {
    const quoteCopy = `${req.body.quoteCopy}`;
    const location = {
        latitude: `${req.body.location.latitude}`,
        longitude: `${req.body.location.longitude}`
    };
    // Associated account is listed as the current session account holder.
    const username = `${req.session.account.username}`;

    if (!quoteCopy || !username) {
        return res.status(400).json({ error: 'All attributes are required!' });
    }

    const quoteData = {
        quoteCopy: quoteCopy,
        location: location,
        owner: username
    };

    try {
        const newQuote = new Quote(quoteData);
        await newQuote.save();
        return res.status(201).json(
            {quoteCopy: newQuote.quoteCopy, location: newQuote.location, owner: newQuote.owner}
        );
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occured.' });
    }
}

// Get all quotes from the database.
const getQuotes = async (req, res) => {
    await QuoteModel.find().select('quoteCopy owner location createdDate _id').lean().exec((err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occured!' });
        }
        return res.json({ quotes: docs });
    });
}

// Get quotes within a certain distance (1km) from the database.
const getLocationQuotes = async (req, res) => {
    const location = {
        latitude: `${req.query.location.latitude}`,
        longitude: `${req.query.location.longitude}`
    };

    // Mongoose has built-in tools for location-based objects.
    const search = {
        location: {
            $near: {
                $maxDistance: 1,
                $geometry: {
                    type: "Point",
                    coordinates: [longitude, latitude]
                }
            }
        }
    };

    await QuoteModel.find(location).select('quoteCopy owner createdDate _id').lean().exect((err, docs) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error occured!' });
        }
        return res.json({ quotes: docs });
    });
}

module.exports = {
    makeQuote,
    makeLocationQuote,
    getQuotes,
    getLocationQuotes
};