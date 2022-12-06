const { RenderHeader, PostView, HandleError } = require('./components.jsx');
const helper = require('./helper.js');

// the main account page options
const AccountOptions = () => {
    return (
        <div className="mg-row fill-height" id="account-options">
            <div className="mg-col">
                <div className="mg-nav" data-toggle="nav">
                    <ul id="account-nav" className="ui-box">
                        <li id="account-title"><h2>My Account</h2></li>
                        <li id="premium-indicator" className="hidden"><p>Stage Premium active</p></li>
                        <li id="padding"></li>
                        <li id="myPosts" className="active"><a href="/account">My Posts</a></li>
                        <li id="premium"><a href="/account">Stage Premium</a></li>
                        <li id="changePassButton"><a href="/account">Change Password</a></li>
                        <li id="ex1"><a>Example Option 1</a></li>
                        <li id="ex2"><a>Another Example</a></li>
                    </ul>
                    <div className="mg-col mg-x--center"></div>
                </div>
            </div>
        </div>
    );
};

// generates a component containing a list of PostViews for each of the users posts
const MyPosts = (props) => {
    const postList = props.posts.map(post => {
        return (
            <PostView title={post.title} body={post.body} username={post.username} likes={post.likes} myposts={true} key={post._id} />
        );
    });

    return (
        <div className="mg-row fill-height" id="my-posts">
            <div className="mg-col">
                {postList}
            </div>
        </div>
    );
};

// the form component for purchasing Stage Premium
const StagePremium = (props) => {
    return (
        <div className="mg-row fill-height ui-box" id="stage-premium">
            <div className="mg-col mg-x--center">
                <h2>Stage Premium</h2>
                <p>Stage Premium disables the maximum daily post limit for only $5 per month.</p>
                <div className="mg-row">
                    <div className="mg-col">
                        <h4>Enter Card Information</h4>
                        <form id="credit-card-form">
                            <div className="mg-row">
                                <div className="mg-col">
                                    <label htmlFor="card-number">Card Number</label>
                                    <input type="text" id="card-number" name="card-number" />
                                </div>
                            </div>
                            <div className="mg-row">
                                <div className="mg-col">
                                    <label htmlFor="card-exp">Expiration Date</label>
                                    <input type="text" id="card-exp" name="card-exp" />
                                </div>
                                <div className="mg-col">
                                    <label htmlFor="card-cvv">CVV</label>
                                    <input type="text" id="card-cvv" name="card-cvv" />
                                </div>
                            </div>
                            <div className="mg-row">
                                <div className="mg-col">
                                    <label htmlFor="card-zip">Zip Code</label>
                                    <input type="text" id="card-zip" name="card-zip" />
                                </div>
                            </div>
                            <div className="mg-row">
                                <div className="mg-col" id="error">
                                </div>
                            </div>
                            <div className="mg-row">
                                <div className="mg-col">
                                    <h6 id="confirm" className="hidden">Purchase Successful</h6>
                                </div>
                            </div>
                            <div className="mg-row">
                                <div className="mg-col">
                                    <button type="submit" id="submit-credit-card">Submit (fields not required)</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// the form component for changing the users password
const ChangePassword = (props) => {
    return (
        <div className="mg-row ui-box" id="change-password">
            <div className="mg-col mg-x--center">
                <h2>Change Password</h2>
                <form className="fill-width" id="change-password-form">
                    <div className="mg-row">
                        <div className="mg-col">
                            <label htmlFor="old-password">Old Password</label>
                            <input type="password" id="old-password" name="old-password" />
                        </div>
                    </div>
                    <div className="mg-row">
                        <div className="mg-col">
                            <label htmlFor="new-password">New Password</label>
                            <input type="password" id="new-password" name="new-password" />
                        </div>
                    </div>
                    <div className="mg-row">
                        <div className="mg-col">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input type="password" id="confirm-password" name="confirm-password" />
                        </div>
                    </div>
                    <div className="mg-row">
                        <div className="mg-col" id="error">
                        </div>
                    </div>
                    <div className="mg-row">
                        <div className="mg-col">
                            <h6 id="confirm" className="hidden">Password Updated</h6>
                        </div>
                        </div>
                    <div className="mg-row">
                        <div className="mg-col">
                            <button type="submit" id="submit-password-change">Submit</button>
                        </div>
                    </div>
                </form>
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

    const premiumRes = await fetch('/hasPremium');
    const premiumData = await premiumRes.json();
    // if the user has premium, show the premium indicator
    if(premiumData.premium){
        document.getElementById('premium-indicator').classList.remove('hidden');
    }

    // gets the users posts and renders them with the MyPosts component
    const renderMyPosts = async () => {
        const response = await fetch('/getPosts');
        const data = await response.json();
        if (data.error){
            HandleError(data.error);
        } else {
            ReactDOM.render(
                <MyPosts posts={data.posts} />,
                document.getElementById('subContent')
            );
        }
    };
    renderMyPosts();

    const myPosts = document.getElementById('myPosts');
    const premium = document.getElementById('premium');
    const changePassButton = document.getElementById('changePassButton');

    myPosts.addEventListener('click', (e) => {
        e.preventDefault();
        myPosts.classList.add('active');
        premium.classList.remove('active');
        changePassButton.classList.remove('active');
        renderMyPosts();
        return false;
    });

    // renders the premium form
    // submitting the form will give premium regardless of the credit card info
    premium.addEventListener('click', (e) => {
        e.preventDefault();
        myPosts.classList.remove('active');
        premium.classList.add('active');
        changePassButton.classList.remove('active');
        ReactDOM.render(
            <StagePremium />,
            document.getElementById('subContent')
        );
        const submitCreditCard = document.getElementById('submit-credit-card');
        submitCreditCard.addEventListener('click', async (e) => {
            e.preventDefault();
            helper.sendPost('/givePremium', {_csrf: data.csrfToken}, (res) => {
                if(res.message){
                    // display a success message
                    document.getElementById('premium-indicator').classList.remove('hidden');
                    document.getElementById('confirm').classList.remove('hidden');
                }
            });
            return false;
        });
        return false;
    });

    // renders the change password form
    // if all values are valid, the password will be changed and a success message will be displayed
    changePassButton.addEventListener('click', (e) => {
        e.preventDefault();
        myPosts.classList.remove('active');
        premium.classList.remove('active');
        changePassButton.classList.add('active');
        ReactDOM.render(
            <ChangePassword />,
            document.getElementById('subContent')
        );
        const submitPasswordChange = document.getElementById('submit-password-change');
        submitPasswordChange.addEventListener('click', async (e) => {
            e.preventDefault();
            const oldPass = document.getElementById('old-password').value;
            const newPass = document.getElementById('new-password').value;
            const newPass2 = document.getElementById('confirm-password').value;
            if (newPass !== newPass2){
                HandleError('Passwords do not match');
            } else {
                helper.sendPost('/changePassword', {oldPass, newPass, newPass2, _csrf: data.csrfToken}, (res) => {
                    // display a success message
                    if(res.message) document.getElementById('confirm').classList.remove('hidden');
                });
            }
            return false;
        });
        return false;
    });
};

window.onload = init;