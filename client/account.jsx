const { RenderHeader, PostView } = require('./components.jsx');

const AccountOptions = (props) => {
    return (
        <div className="mg-row fill-height" id="account-options">
            <div className="mg-col mg-x6">
                <div className="mg-nav" data-toggle="nav">
                    <ul id="account-nav" className="post-box">
                        <li id="account-title"><h2>My Account</h2></li>
                        <li id="premium-indicator" className="hidden"><p>Premium User</p></li>
                        <li id="myPosts"><a href="/account">My Posts</a></li>
                        <li id="premium"><a href="/account">Stage Premium</a></li>
                        <li id="changePassButton"><a href="/account">Change Password</a></li>
                        <li id="ex1"><a>Example Option 1</a></li>
                        <li id="ex2"><a>Example Option 2</a></li>
                        <li id="ex3"><a>Example Option 3</a></li>
                    </ul>
                    <div className="mg-col mg-x--center"></div>
                </div>
            </div>
        </div>
    );
};


const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();
    const links = [
        {href: '/stage', text: 'Stage', id: 'stageButton', current: false},
        {href: '/post', text: 'New Post', id: 'postButton', current: false},
        {href: '/account', text: 'Account', id: 'accountButton', current: false},
        {href: '/logout', text: 'Logout', id: 'logoutButton', current: false}
    ];

    RenderHeader(links, 'accountButton');

    const postButton = document.getElementById('postButton');
    const stageButton = document.getElementById('stageButton');
    const accountButton = document.getElementById('accountButton');
    const logoutButton = document.getElementById('logoutButton');

    postButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/post';
        return false;
    });

    stageButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/stage';
        return false;
    });

    accountButton.addEventListener('click', (e) => {
        e.preventDefault();
        return false;
    });

    ReactDOM.render(
        <AccountOptions/>,
        document.getElementById('content')
    );
};

window.onload = init;