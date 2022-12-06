// props contains an array of link objects with href, text, id, and current properties
// href is the link destination
// text is the link text
// id is the id of the form element
// current is a boolean that determines if the link is active
// returns a nav component with links based on the props
const NavHeader = (props) => {
    const navList = props.links.map(link => {
        if(link.current) {
            return <li id={link.id} className="active" key={link.id}><a href={link.href}>{link.text}</a></li>;
        } else{
            return <li id={link.id} key={link.id}><a href={link.href}>{link.text}</a></li>;
        }
    });

    return (
        <div className="mg-nav" data-toggle="nav">
            <ul>
                <li id="logo"><h1><a href="/">Stage</a></h1></li>
                {navList}
            </ul>
        </div>
    );
};


// takes the link array and the id of the current page
// renders the NavHeader component
const RenderHeader = (links, activeId,) => {
    links.map(link => 
        link.current = link.id === activeId
    );
    ReactDOM.render(
        <NavHeader links={links} />,
        document.getElementById('header') 
    );
};

// props contains the title, body, username, and likes of the post
// generates a post component. If being displayed on the myposts page, the 'new post' button is hidden
const PostView = (props) => {
    let newButton = <div></div>;
    if(!props.myposts) {
        newButton = 
            <div className="mg-x--center">
                <button className="button button--small button--link" id="newButton">
                    <img className="imgButton" src="/assets/img/new-inactive.png" alt="new" />
                </button>
                <p className="center-text small-text">new post</p>
            </div>;
    }

    return (
        <div className="mg-row post-box">
            <div className="mg-col mg-x--center">
                <div className="mg-row"><h3 className="post-title">{props.title}</h3></div>
                <div className="mg-row"><h5 className="post-username">{props.username}</h5></div>
                <div className="mg-row"><p>{props.body}</p></div>
                <div className="mg-row">
                    <div className="mg-x--center">
                        <button className="button button--small button--link inactive" id="likeButton">
                            <img className="imgButton" src="/assets/img/like-inactive.png" alt="like" id="likeImg"/>
                        </button>
                        <p className="center-text small-text" id="likeNum">{props.likes}</p>
                    </div>
                    {newButton}
                </div>
            </div>
        </div>
    )
};

// props contains the error message
// generates an error alert component
const ErrorAlert = (props) =>{
    return (
        <div className="mg-alert warning" id="errorAlert">
            <span className="mg-alert--closebtn mg-icon-close" onClick={
                (e) => e.currentTarget.parentElement.classList.toggle('hidden')
            }></span>
            {props.message}
        </div>
    );
}

// creates an error alert with the given message and renders it in the error div
const HandleError = (message) => {
    ReactDOM.render(
        <ErrorAlert message={message} />,
        document.getElementById('error')
    );
    document.getElementById('errorAlert').classList.remove('hidden');
}

module.exports = {
    RenderHeader,
    PostView,
    ErrorAlert,
    HandleError
}