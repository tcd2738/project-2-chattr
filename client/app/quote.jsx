const helper = require('../helper.js');

// Window that displays form for adding public (location-based) quotes.
const LocationQuoteWindow = (props) => {
    return (
    <form id="lqForm"
        onSubmit={handleLocationQuote}
        name="lqForm"
        action="/addLocationQuote"
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
const handleLocationQuote = async (e) => {
    e.preventDefault();
    helper.hideError();

    const quoteCopy = e.target.querySelector('#quoteCopy').value;
    const _csrf = e.target.querySelector("#_csrf").value;

    if (!quoteCopy) {
        helper.handleError("You didn't enter a quote!");
        return false;  
    }

    // Check for location and send quote if successful.
    const location = await helper.getLocation();
    if (location !== undefined) {
        helper.sendPost(e.target.action, {quoteCopy, location, _csrf});
        return false;
    } else {
        helper.handleError("Unable to access your location!");
        return false;
    }
};

module.exports = { LocationQuoteWindow };

