const helper = require('./helper.js');

const DomoForm = (props) => {
    return (
        <form id="domoForm"
            onSubmit={handleDomo}
            name="domoForm"
            action="/maker"
            method="POST"
            className="domoForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="number" min="0" name="age" />
            <label htmlFor="powerLvl">Power Level: </label>
            <input id="domoPowerLvl" type="number" min="0" name="powerLvl" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    );
};

const DomoList = (props) => {
    if (props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(domo => {
        return (
            <div key={domo._id} className="domo">
                <div className="domoTitle">
                    <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                    <h3 className="domoName">{domo.name} </h3>
                </div>
                <h3 className="domoAge">Age: {domo.age} </h3>
                <h3 className="domoPowerLvl">Power Level: {domo.powerLvl}</h3>
                <button className="deleteDomoButton" onClick={(e) => deleteDomo(domo.name, props.csrf)}>Delete Domo</button>
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = async (_csrf) => {
    const response = await fetch('/getDomos');
    const data = await response.json();
    ReactDOM.render(
        <DomoList domos={data.domos} csrf={_csrf} />,
        document.getElementById('domos')
    );
};

const handleDomo = async (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const powerLvl = e.target.querySelector('#domoPowerLvl').value;
    const _csrf = e.target.querySelector("#_csrf").value;

    if (!name || !age || !powerLvl) {
        helper.handleError('All fields are required!');
        return false;
    }

    await helper.sendPost(e.target.action, {name, age, powerLvl, _csrf});
    loadDomosFromServer(_csrf)
    return false;
};

const deleteDomo = async (name, _csrf) => {
    helper.hideError();

    await helper.sendPost('/deleteDomo', {name, _csrf});
    loadDomosFromServer(_csrf)
    return false;
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <DomoForm csrf={data.csrfToken} />,
        document.getElementById('makeDomo')
    );

    ReactDOM.render(
        <DomoList csrf={data.csrfToken} domos={[]} />,
        document.getElementById('domos')
    );

    loadDomosFromServer(data.csrfToken);
}; 

window.onload = init;