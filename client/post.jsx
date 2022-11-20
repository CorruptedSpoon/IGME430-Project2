const helper = require('./helper');
const { RenderHeader } = require('./components.jsx');

const handlePost = (e) => {
    e.preventDefault();
    helper.hideError();

    const title = e.target.querySelector('#title').value;
    const body = e.target.querySelector('#body').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!title || !body) {
        helper.handleError('all fields are required');
        return false;
    }

    helper.sendPost(e.target.action, {title, body, _csrf});

    return false;
};

const PostWindow = (props) => {
    return (
        <form id="postForm"
            name="postForm"
            onSubmit={handlePost}
            action="/post"
            method="POST"
            className="mainForm"
        >
            <div className="mg-container">
                <div className="mg-row"><label htmlFor="title">Title: </label></div>
                <div className="mg-row"><input id="title" type="text" name="title" placeholder="title" /></div>
                <div className="mg-row"><input id="body" type="text" name="body" placeholder="what's on your mind?" /></div>
                <div className="mg-row">
                    <div className="mg-col mg-x--center">
                        <div className="mg-row">
                            <input className="formSubmit button--outline" type="submit" value="Post" />
                        </div>
                    </div>
                </div>
                <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
                <div id="errorMessage" className="hidden mg-row mg-row mg-x--center">
                    <p className="center-text"><span id="errorText"></span></p>
                </div>
            </div>
        </form>
    );
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();
    const links = [
        {href: '/stage', text: 'Stage', id: 'stageButton', current: false},
        {href: '/post', text: 'New Post', id: 'postButton', current: false},
        {href: '/logout', text: 'Logout', id: 'logoutButton', current: false}
    ];

    RenderHeader(links, 'postButton');

    const postButton = document.getElementById('postButton');
    const stageButton = document.getElementById('stageButton');

    postButton.addEventListener('click', (e) => {
        e.preventDefault();
        return false;
    });

    stageButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/stage';
        return false;
    });

    ReactDOM.render(
        <PostWindow csrf={data.csrfToken} />,
        document.getElementById('content')
    );
};

window.onload = init;