const {useState, useEffect} = React;
const helper = require('../helper.js');

// Window that displays form for creating private jar.
const JarCreationWindow = (props) => {
    return (
    <form id="jarForm"
        onSubmit={handleJarCreation}
        name="jarForm"
        action="/makeJar"
        method="POST"
        className="jarForm"
    >
        <h1>Create a Personal Jar: </h1>
        <label htmlFor="jarName">Jar Name: </label>
        <input id="jarName" type="text" name="jarName" placeholder="Jar Name" />
        <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
        <input className="makeJar" type="submit" value="Create Jar" />
    </form>
)};

// Container that displays quotes from 1km radius.
const LocationJarContainer = (props) => {
    const [quotes, fillJar] = useState(props.quotes);
    const [location, findLocation] = useState(props.location);

    useEffect(async () => {
        setTimeout(async () => {
            // Check for location and run question search if successful.
            const lResponse = await helper.getLocation();
            if (lResponse !== undefined) {
                const qResponse = await fetch('/getLocationQuotes?longitude=' + lResponse.longitude + '&latitude=' + lResponse.latitude, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const qDocs = await qResponse.json();
                const quotes = qDocs.quotes;
                fillJar(quotes);
                findLocation(lResponse); 
    
                console.log('just checked quotes and location');
            } else {
                helper.handleError("Unable to access your location!");
            }
        }, 30000);
    });

    if (quotes.length === 0) {
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

// Create a jar based on jarForm.
const handleJarCreation = async (e) => {
    e.preventDefault();
    helper.hideError();

    const jarName = e.target.querySelector('#jarName').value;
    const _csrf = e.target.querySelector("#_csrf").value;

    if (!jarName) {
        helper.handleError("You didn't enter a jar name!");
        return false;  
    }

    await helper.sendRequest('POST', e.target.action, {jarName, _csrf});
    return false;
};

module.exports = { JarCreationWindow, LocationJarContainer };