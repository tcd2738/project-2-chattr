const helper = require('../helper.js');

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

const handleLocationQuote = async (e) => {
    e.preventDefault();
    helper.hideError();

    const quoteCopy = e.target.querySelector('#quoteCopy').value;
    const _csrf = e.target.querySelector("#_csrf").value;

    if (!quoteCopy) {
        helper.handleError("You didn't enter a quote!");
        return false;  
    }

    await helper.sendPost(e.target.action, {quoteCopy, _csrf});
    // loadLocationQuotesFromServer(_csrf);
    return false;
};

module.exports = { LocationQuoteWindow };

