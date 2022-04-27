const { QuoteMakerWindow, QuoteContainer, OwnerQuoteContainer } = require('./app/quote.jsx');
const helper = require('./helper.js');

// Initializes all necessary components for main app interface.
const init = async () => {
    // Get security data up front.
    const CSRFresponse = await fetch('/getToken');
    const CSRFdata = await CSRFresponse.json();
    const _csrf = CSRFdata.csrfToken;

    const usernameResponse = await fetch('/getUsername');
    const usernameData = await usernameResponse.json();
    const username = usernameData.username;

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

        ReactDOM.render(<OwnerQuoteContainer username={username} csrf={_csrf} quotes={quotes} />,
        document.getElementById('content'));
        ReactDOM.render('', document.getElementById('content2'));
        return false;
    });

    mainPageLoad(_csrf);
};

// Loads the main page and all necessary requirements.
const mainPageLoad = async (_csrf) => {
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
        
            ReactDOM.render(
                <QuoteContainer quotes={qDocs.quotes} csrf={_csrf} />, 
                document.getElementById('content')
            );
        } else {
            helper.handleLocationError("Unable to access your location!");
        }   

        // Render quote maker window too.
        ReactDOM.render(
            <QuoteMakerWindow csrf={_csrf} />,
            document.getElementById('content2')
        );
    }, (err) => {
        // Render quote maker window even if location check fails.
        ReactDOM.render(
            <QuoteMakerWindow csrf={_csrf} />,
            document.getElementById('content2')
        );
    }); 
}

window.onload = init;