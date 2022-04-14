const { JarCreationWindow, LocationJarContainer } = require('./app/jar.jsx');
const { LocationQuoteWindow } = require('./app/quote.jsx');
const { PremiumWindow } = require('./app/premium.jsx');
const helper = require('./helper.js');

// Initializes all necessary components for main app interface.
const init = async () => {
    // Get security data up front.
    const response = await fetch('/getToken');
    const data = await response.json();
    const _csrf = data.csrfToken;

    // Find necessary elements and add click handlers.
    const makeJarButton = document.getElementById('makeJarButton');
    const premiumButton = document.getElementById('premiumButton');

    makeJarButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<JarCreationWindow csrf={_csrf} />,
        document.getElementById('content'));
        ReactDOM.render('', document.getElementById('content2'));
        return false;
    });

    premiumButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<PremiumWindow csrf={_csrf} />,
        document.getElementById('content'));
        ReactDOM.render('', document.getElementById('content2'));
        return false;
    });

    // Check for location and render starting components if successful.
    const lResponse = helper.getLocation();
    if (lResponse !== undefined) {
        const qResponse = await fetch('/getLocationQuotes?longitude=' + lResponse.longitude + '&latitude=' + lResponse.latitude, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        const qDocs = await qResponse.json();
    
        ReactDOM.render(
            <LocationJarContainer quotes={qDocs.quotes} location={lResponse} csrf={_csrf} />, 
            document.getElementById('content')
        );
    } else {
        helper.handleError("Unable to access your location!");
    }

    ReactDOM.render(
        <LocationQuoteWindow csrf={_csrf} />,
        document.getElementById('content2')
    );
};

window.onload = init;