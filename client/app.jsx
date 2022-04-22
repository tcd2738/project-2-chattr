const { QuoteMakerWindow, QuoteContainer } = require('./app/quote.jsx');
const { PremiumWindow } = require('./app/premium.jsx');
const helper = require('./helper.js');

// Initializes all necessary components for main app interface.
const init = async () => {
    // Get security data up front.
    const response = await fetch('/getToken');
    const data = await response.json();
    const _csrf = data.csrfToken;

    // Find necessary elements and add click handlers.
    const premiumButton = document.getElementById('premiumButton');

    premiumButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<PremiumWindow csrf={_csrf} />,
        document.getElementById('content'));
        ReactDOM.render('', document.getElementById('content2'));
        return false;
    });

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
            helper.handleError("Unable to access your location!");
            return false;
        }       
    }, 2000);

    ReactDOM.render(
        <QuoteMakerWindow csrf={_csrf} />,
        document.getElementById('content2')
    );
};

window.onload = init;