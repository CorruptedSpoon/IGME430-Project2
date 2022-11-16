const helper = require('./helper');

const handleDomo = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const money = e.target.querySelector('#domoMoney').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!name || !age) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, age, money, _csrf}, loadDomosFromServer);
    
    return false;
};

const handleGiveMoney = (e, id, money) => {
    e.preventDefault();
    helper.hideError();

    const _csrf = e.target.parentNode.querySelector('#_csrf').value;

    helper.sendPost('/giveMoney', {id, money, _csrf}, loadDomosFromServer);

    return false;
};

const DomoForm = (props) => {
    return (
        <form id="domoForm"
            onSubmit={handleDomo}
            name="domoForm"
            action="/maker"
            method="POST"
            className="domoForm"
        >
            <label htmlFor="name" id="nameLabel">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="number" min="0" name="age" />
            <label htmlFor="money">Money: </label>
            <input id="domoMoney" type="number" min="0" name="money" />
            <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    );
};

const DomoList = (props) => {
    if(props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map((domo) => {
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName">Name: {domo.name}</h3>
                <h3 className="domoAge">Age: {domo.age}</h3>
                <h3 className="domoMoney">Money: {domo.money}</h3>
                <input id="giveMoney" type="button" value="Give Money" onClick={(e) => handleGiveMoney(e, domo._id, domo.money)} />
                <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();

    const tokenRes = await fetch('/getToken');
    const tokenData = await tokenRes.json();

    ReactDOM.render(
        <DomoList domos={data.domos} csrf={tokenData.csrfToken} />,
        document.getElementById('domos')
    );
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <DomoForm csrf={data.csrfToken} />,
        document.getElementById('makeDomo')
    );

    ReactDOM.render(
        <DomoList domos={[]} csrf={data.csrfToken} />,
        document.getElementById('domos')
    );

    loadDomosFromServer();
};

window.onload = init;