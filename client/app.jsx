const { QuoteMakerWindow, QuoteContainer, OwnerQuoteContainer } = require('./app/quote.jsx');
const helper = require('./helper.js');

// Initializes all necessary components for main app interface.
const init = async () => {
    // Get security data up front.
    const response = await fetch('/getToken');
    const data = await response.json();
    const _csrf = data.csrfToken;

    // Find necessary elements and add click handlers.
    const appButton = document.getElementById('mainAppButton');
    const ownerQuoteButton = document.getElementById('ownerQuoteButton');

    appButton.addEventListener('click', (e) => {
        e.preventDefault();
        mainPageLoad(_csrf, e);
        return false;
    });

    ownerQuoteButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const qResponse = await fetch('/getOwnerQuotes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        const qDocs = await qResponse.json();
        const quotes = qDocs.quotes;

        ReactDOM.render(<OwnerQuoteContainer csrf={_csrf} quotes={quotes} />,
        document.getElementById('content'));
        ReactDOM.render('', document.getElementById('content2'));
        return false;
    });

    mainPageLoad(_csrf);
};

// Loads the main page and all necessary requirements.
const mainPageLoad = async (_csrf) => {
    
    
    // Check for location and render starting components if successful.
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
    
    setTimeout(async () => {
        if (location !== undefined) {
            const qResponse = await fetch('/getQuotes?longitude=' + location.longitude + '&latitude=' + location.latitude, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const qDocs = await qResponse.json();
        
            ReactDOM.render(
                <QuoteContainer quotes={qDocs.quotes} location={location} csrf={_csrf} />, 
                document.getElementById('content')
            );
        } else {
            helper.handleLocationError("Unable to access your location!");
            return false;
        }       
    }, 2000);

    ReactDOM.render(
        <QuoteMakerWindow csrf={_csrf} />,
        document.getElementById('content2')
    );
}

window.onload = init;