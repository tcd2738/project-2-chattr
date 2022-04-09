const helper = require('../helper.js');

const JarCreationWindow = (props) => {
    return (
    <form id="jarForm"
        onSubmit={handleJar}
        name="jarForm"
        action="/makeJar"
        method="POST"
        className="jarForm"
    >
        <h1>Quotes From Your Current Location: </h1>
        <label htmlFor="jarName">Jar Name: </label>
        <input id="jarName" type="text" name="jarName" placeholder="Jar Name" />
        <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
        <input className="makeJar" type="submit" value="Create Jar" />
    </form>
)};

const handleJar = async (e) => {
    e.preventDefault();
    helper.hideError();

    const jarName = e.target.querySelector('#jarName').value;
    const _csrf = e.target.querySelector("#_csrf").value;

    if (!jarName) {
        helper.handleError("You didn't enter a jar name!");
        return false;  
    }

    await helper.sendPost(e.target.action, {jarName, _csrf});
    // loadJarsFromServer(_csrf);
    return false;
};

module.exports = { JarCreationWindow };