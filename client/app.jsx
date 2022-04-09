const { JarCreationWindow } = require('./app/jar.jsx');
const { LocationQuoteWindow } = require('./app/quote.jsx');
const { PremiumWindow } = require('./app/premium.jsx');

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    const makeJarButton = document.getElementById('makeJarButton');
    const premiumButton = document.getElementById('premiumButton');

    makeJarButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<JarCreationWindow csrf={data.csrfToken} />,
        document.getElementById('content'));
        ReactDOM.render('', document.getElementById('content2'));
        return false;
    });

    premiumButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<PremiumWindow csrf={data.csrfToken} />,
        document.getElementById('content'));
        ReactDOM.render('', document.getElementById('content2'));
        return false;
    });

    ReactDOM.render(
        <LocationQuoteWindow csrf={data.csrfToken} />,
        document.getElementById('content')
    );
};

window.onload = init;