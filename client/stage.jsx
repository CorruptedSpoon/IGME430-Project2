const { RenderHeader, PostView, CommentView, HandleError } = require('./components.jsx');
const helper = require('./helper.js');

const StageWindow = (props) => {
    return (
        <div className="mg-container">
            <PostView title={props.title} body={props.body} username={props.username} likes={props.likes}/>
        </div>
    )
};

const init = async () => {
    let currentPost;
    const tokenRes = await fetch('/getToken');
    const token = await tokenRes.json();
    const links = [
        {href: '/stage', text: 'Stage', id: 'stageButton', current: false},
        {href: '/post', text: 'New Post', id: 'postButton', current: false},
        {href: '/account', text: 'Account', id: 'accountButton', current: false},
        {href: '/logout', text: 'Logout', id: 'logoutButton', current: false}
    ];

    RenderHeader(links, 'stageButton');

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
        return false;
    });

    accountButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/account';
        return false;
    });

    const getPost = async () => {
        const response = await fetch('/stagedPost');
        currentPost = await response.json();
        if (currentPost.error){
            HandleError(currentPost.error);
        } else {
            helper.sendPost('/updateScore', {id: currentPost.post._id, _csrf: token.csrfToken});

            ReactDOM.render(
                <StageWindow title={currentPost.post.title} body={currentPost.post.body} username={currentPost.post.username} likes={currentPost.post.likes} />,
                document.getElementById('content')
            );
        }
    };
    await getPost();

    const likeButton = document.getElementById('likeButton');
    const newButton = document.getElementById('newButton');

    likeButton.addEventListener('click', async (e) => {
        e.preventDefault();
        const likeNum = document.getElementById('likeNum');
        if(likeButton.className.includes('inactive')) {
            helper.sendPost('/addLike', {id: currentPost.post._id, _csrf: token.csrfToken});
            likeNum.textContent = parseInt(likeNum.textContent) + 1;
            likeButton.className = likeButton.className.replace('inactive', 'active');
            document.getElementById('likeImg').src = '/assets/img/like-active.png';
        } else {
            helper.sendPost('/removeLike', {id: currentPost.post._id, _csrf: token.csrfToken});
            likeNum.textContent = parseInt(likeNum.textContent) - 1;
            likeButton.className = likeButton.className.replace('active', 'inactive');
            document.getElementById('likeImg').src = '/assets/img/like-inactive.png';
        }
    });

    newButton.addEventListener('click', async (e) => {
        e.preventDefault();
        document.getElementById('likeButton').className = 'button button--small button--link inactive';
        document.getElementById('likeImg').src = '/assets/img/like-inactive.png';
        getPost();
    });
};

window.onload = init;