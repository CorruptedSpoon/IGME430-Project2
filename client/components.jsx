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

const ErrorAlert = () =>{
    return (
        <div className="mg-alert warning hidden" id="errorAlert">
            <span className="mg-alert--closebtn mg-icon-close" onClick={
                (e) => e.currentTarget.parentElement.classList.toggle('hidden')
            }></span>
            default alert
        </div>
    );
}

module.exports = {
    RenderHeader,
    ErrorAlert
}