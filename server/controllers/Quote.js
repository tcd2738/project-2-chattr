const models = require('../models');
const QuoteModel = require('../models/Quote');

const { Quote } = models;

const makeQuote = async (req, res) => {

    const quoteCopy = `${req.body.quoteCopy}`;
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

const makeLocationQuote = async (req, res) => {

}

module.exports = {
    makeQuote,
    makeLocationQuote
};