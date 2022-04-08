const helper = require('./helper.js');

const PremiumButton = () => {
    return (
        <button onClick={openPremiumWindow}>Change premium status?</button>
    );
};

const PremiumWindow = (props) => {
    return (
        <form id="PremiumForm"
            name="PremiumForm"
            onSubmit={handlePremium}
            action="/setPremium"
            method="POST"
            className="mainForm"
        >
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

const openPremiumWindow = async (e) => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(<PremiumWindow csrf={data.csrfToken} />,
    document.getElementById('premium'));
    return false;
};

const handlePremium = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const _csrf = e.target.querySelector('#_csrf').value;

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

    helper.sendPost(e.target.action, {username, pass, premium, _csrf}, (res) => {
        if(res.status === 200) {
            ReactDOM.render(<PremiumButton/>, document.getElementById('premium'));
        }
    });

    return false;
}

const init = async () => {
    ReactDOM.render(<PremiumButton/>, document.getElementById('premium'));
};

window.onload = init;