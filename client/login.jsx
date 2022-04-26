const helper = require('./helper.js');

// Window that displays form for logging in.
const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign In" />
        </form>
    );
};

// Window that displays form for signing up.
const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign Up" />
        </form>
    );
};

// Window that displays form for changing password.
const ChangePasswordWindow = (props) => {
    return (
        <form id="changePasswordForm"
            name="changePasswordForm"
            onSubmit={handlePasswordChange}
            action="/changePassword"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="oldPass">Old Password: </label>
            <input id="oldPass" type="password" name="oldPass" placeholder="old password" />
            <label htmlFor="newPass">New Password: </label>
            <input id="newPass" type="password" name="newPass" placeholder="new password" />
            <label htmlFor="newPass2">New Password: </label>
            <input id="newPass2" type="password" name="newPass2" placeholder="retype new password" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Change Password" />
        </form>
    );  
}

// Log into account based on data from loginForm.
const handleLogin = (e) => {
    e.preventDefault();
    
    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendRequest('POST', e.target.action, {username, pass, _csrf});
    return false;
};

// Create an account based on signupForm.
const handleSignup = (e) => {
    e.preventDefault();
    
    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if (pass != pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendRequest('POST', e.target.action, {username, pass, pass2, _csrf});
    return false;
};

// Change password based on info from changePasswordForm.
const handlePasswordChange = (e) => {
    e.preventDefault();

    const username = e.target.querySelector('#user').value;
    const oldPass = e.target.querySelector('#oldPass').value;
    const newPass = e.target.querySelector('#newPass').value;
    const newPass2 = e.target.querySelector('#newPass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if (!username || !oldPass ||!newPass || !newPass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if (newPass != newPass2) {
        helper.handleError('New passwords do not match!');
        return false;
    }

    helper.sendRequest('POST', e.target.action, {username, oldPass, newPass, newPass2, _csrf});
    return false;
}

// Initialize all the components needed for the login page.
const init = async () => {
    // Get security data up front.
    const response = await fetch('/getToken');
    const data = await response.json();

    // Find necessary elements and add click handlers.
    const loginButton = document.getElementById('mainLoginButton');
    const signupButton = document.getElementById('signupButton');
    const changePasswordButton = document.getElementById('changePasswordButton');

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        mainPageLoad(data.csrfToken);
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<SignupWindow csrf={data.csrfToken} />,
        document.getElementById('content'));
        return false;
    });

    changePasswordButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<ChangePasswordWindow csrf={data.csrfToken} />,
        document.getElementById('content'));
        return false;
    });

    mainPageLoad(data.csrfToken);
};

// Loads the main login page and all necessary requirements.
const mainPageLoad = (_csrf) => {
    ReactDOM.render(<LoginWindow csrf={_csrf} />,
    document.getElementById('content'));
    return false;
}

window.onload = init;