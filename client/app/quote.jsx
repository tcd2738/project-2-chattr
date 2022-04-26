const {useState, useEffect} = React;
const helper = require('../helper.js');

// Window that displays form for adding public (location-based) quotes.
const QuoteMakerWindow = (props) => {
    return (
    <form id="lqForm"
        onSubmit={handleQuoteMaker}
        name="lqForm"
        action="/addQuote"
        method="POST"
        className="lqForm"
    >
        <h1>Add a Location-based Quote:</h1>
        <label htmlFor="quoteCopy">Quote: </label>
        <input id="quoteCopy" type="text" name="quoteCopy" placeholder="What'd you hear?" />
        <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
        <input className="submitQuote" type="submit" value="Submit Quote" />
    </form>
)};

// Add quote to MongoDB based off of location quote form.
const handleQuoteMaker = async (e) => {
    e.preventDefault();

    const quoteCopy = e.target.querySelector('#quoteCopy').value;
    const _csrf = e.target.querySelector("#_csrf").value;

    if (!quoteCopy) {
        helper.handleError("You didn't enter a quote!");
        return false;  
    }

    await navigator.geolocation.getCurrentPosition((position) => {
        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        if (location !== undefined) {
            helper.sendRequest('POST', '/addQuote', {quoteCopy, location, _csrf});
        } else {
            helper.handleLocationError("Unable to access your location!");
        } 
    });
};

// Container that displays quotes from 1km radius.
const QuoteContainer = (props) => {
    const [quotes, fillJar] = useState(props.quotes);

    useEffect(() => {
        // Check the location and reload the quotes every 10 seconds.
        const interval = setInterval(async () => {
            await navigator.geolocation.getCurrentPosition(async (position) => {
                const lResponse = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
        
                if (lResponse !== undefined) {
                    
                    const qResponse = await fetch('/getQuotes?longitude=' + lResponse.longitude + '&latitude=' + lResponse.latitude, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    const qDocs = await qResponse.json();
                    const quotes = qDocs.quotes;
                    fillJar(quotes); 
                } else {
                    helper.handleLocationError("Unable to access your location!");
                }   
            });      
        }, 10000);
        return () => clearInterval(interval);
    });

    if (quotes.length === 0 || !quotes) {
        return (
            <div>
                <h3>No quotes here!</h3>
            </div>
        );
    }
    
    // Map and display quotes if quotes are found.
    const quoteList = quotes.map((quote) => {
        return (
            <div key={quote._id}>
                <h2>{quote.quoteCopy} - overheard by <i>{quote.owner}</i></h2>
                <div>
                    <h3>Popularity: {quote.votes}</h3>
                    <button onClick={() => handleVote(true, quote, _csrf)}>Like</button>
                    <button onClick={() => handleVote(false, quote, _csrf)}>Dislike</button>
                </div>
            </div>
        );
    });

    return (
        <div>
            <h1>Quotes in Your Area</h1>
            {quoteList}
        </div>
    )
};

// Container that displays quotes from the current users account.
const OwnerQuoteContainer = (props) => {
    if (props.quotes.length === 0 || !props.quotes) {
        return (
            <div>
                <h3>You currently have no quotes!</h3>
            </div>
        );
    }
    
    // Map and display quotes if quotes are found.
    const quoteList = props.quotes.map((quote) => {
        return (
            <div key={quote._id}>
                <h2>{quote.quoteCopy} - overheard by <i>{quote.owner}</i></h2>
                {quote.boosted
                    ? <h3>Quote Boosted</h3>
                    : <button onClick={() => boostQuote(quote, props.csrf)}>Boost quote?</button>
                }
            </div>
        );
    });

    return (
        <div>
            <h1>Your Quotes</h1>
            {quoteList}
        </div>
    )
};

// Send request to server to add vote.
const handleVote = async (voteValue, quote, _csrfObject) => {
    const quoteID = quote._id;
    const _csrf = _csrfObject.value;
    helper.sendRequest('PUT','/addVote', {quoteID, voteValue, _csrf});
};

// Send request to server to boost quote.
const boostQuote = async (quote, _csrfObject) => {
    const quoteID = quote._id;
    const _csrf = _csrfObject;
    helper.sendRequest('PUT', '/boostQuote', {quoteID, _csrf});
};

module.exports = { QuoteMakerWindow, QuoteContainer, OwnerQuoteContainer };

