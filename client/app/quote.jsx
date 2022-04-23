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
    helper.hideError();

    const quoteCopy = e.target.querySelector('#quoteCopy').value;
    const _csrf = e.target.querySelector("#_csrf").value;

    if (!quoteCopy) {
        helper.handleError("You didn't enter a quote!");
        return false;  
    }

    // Check for location and send quote if successful.
    // NOTE: I know setTimeout() is a frowned upon way to code asyncronously,
        // however I spent multiple hours trying to get the navigator object to work
        // correcty with either async/await or promises to no avail. This is the
        // workaround that works best.
    let location;
    await navigator.geolocation.getCurrentPosition((position) => {
        const lResult = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        location = lResult;
    });
    
    setTimeout(() => {
        if (location !== undefined) {
            helper.sendRequest('POST', '/addQuote', {quoteCopy, location, _csrf});
            return false;
        } else {
            helper.handleError("Unable to access your location!");
            return false;
        }       
    }, 5000);
};

// Container that displays quotes from 1km radius.
const QuoteContainer = (props) => {
    const [quotes, fillJar] = useState(props.quotes);
    const [location, findLocation] = useState(props.location);

    useEffect(async () => {
        setTimeout(async () => {
            // Check for location and run question search if successful.
            // NOTE: I know setTimeout() is a frowned upon way to code asyncronously,
                // however I spent multiple hours trying to get the navigator object to work
                // correcty with either async/await or promises to no avail. This is the
                // workaround that works best.
            let lResponse;
            await navigator.geolocation.getCurrentPosition((position) => {
                const lResult = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                lResponse = lResult;
            });
            
            setTimeout(async () => {
                if (lResponse !== undefined) {
                    helper.hideError();
                    const qResponse = await fetch('/getQuotes?longitude=' + lResponse.longitude + '&latitude=' + lResponse.latitude, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    const qDocs = await qResponse.json();
                    const quotes = qDocs.quotes;
                    fillJar(quotes);
                    findLocation(lResponse); 
                } else {
                    helper.handleError("Unable to access your location!");
                }       
            }, 5000);        
        }, 5000);
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
        console.log(quote);
        return (
            <div key={quote._id}>
                <h2>{quote.quoteCopy} - overheard by <i>{quote.owner}</i></h2>
                <div>
                    <h3>Total Votes: {quote.votes}</h3>
                    <button onClick={() => handleVote(true, quote, _csrf)}>Upvote</button>
                    <button onClick={() => handleVote(false, quote, _csrf)}>Downvote</button>
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

const handleVote = async (voteValue, quote, _csrfObject) => {
    const quoteID = quote._id;
    const _csrf = _csrfObject.value;
    helper.sendRequest('PUT','/addVote', {quoteID, voteValue, _csrf});
};

module.exports = { QuoteMakerWindow, QuoteContainer };

