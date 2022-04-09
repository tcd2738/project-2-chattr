const models = require('../models');
const QuoteModel = require('../models/Quote');

const { Quote } = models;

const makeQuote = async (req, res) => {
    if (!req.body.quoteCopy || !req.session.account.username) {
        return res.status(400).json({ error: 'All attributes are required!' });
    }

    const quoteData = {
        quoteCopy: req.body.quoteCopy,
        owner: req.session.account.username
    };

    try {
        const newQuote = new Quote(quoteData);
        await newQuote.save();
        return res.status(201).json(
            {quoteCopy: newQuote.quoteCopy, owner: newQuote.owner}
        );
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
          return res.status(400).json({ error: 'Domo already exists! ' });
        }
        return res.status(400).json({ error: 'An error occured.' });
    }
}

const makeLocationQuote = async (req, res) => {

}

module.exports = {
    makeQuote,
    makeLocationQuote
};