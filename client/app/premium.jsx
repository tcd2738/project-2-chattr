const helper = require('../helper.js');

// Window that displays form for changing a user's premium status.
const PremiumWindow = (props) => {
    return (
        <form id="PremiumForm"
            name="PremiumForm"
            onSubmit={handlePremium}
            action="/setPremium"
            method="POST"
            className="mainForm"
        >
            <h2>Change Your Premium Status?</h2>
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <div id="premiumChoice">
                <input type="radio" id="premiumY" name="premiumChoice" value="true" />
                <label htmlFor="premiumY">Enroll in premium.</label><br/>
                <input type="radio" id="premiumN" name="premiumChoice" value="false" />
                <label htmlFor="premiumN">Unenroll in premium.</label><br/>
            </div>
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Change Premium Status" />
        </form>
    );
}

// Change user's premium status based on premium form.
const handlePremium = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    // Search through premium form radio buttons to find selected value.
    const premiumField = document.getElementsByName('premiumChoice');
    let premium;
    for (let p of premiumField)
    {
        if (p.checked) {
            premium = p.value;
        }
    }

    if (!username || !pass || premium === null) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendRequest('PUT', e.target.action, {username, pass, premium, _csrf});

    return false;
}

module.exports = { PremiumWindow };