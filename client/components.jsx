const parse = require('html-react-parser');

// props contains an array of link objects with href, text, id, and current properties
// href is the link destination
// text is the link text
// id is the id of the form element
// current is a boolean that determines if the link is active
// returns a nav component with links based on the props
const NavHeader = (props) => {
    const navStart= '<ul><li id="logo"><h1><a href="/">Stage</a></h1></li>';
    const linkList = props.links.reduce((acc, link) => {
        if(link.current) {
            return acc + `<li id="${link.id}" class="active"><a href="${link.href}">${link.text}</a></li>`;
        } else {
            return acc + `<li id="${link.id}"><a href="${link.href}">${link.text}</a></li>`;
        }
    }, navStart) + '</ul>';

    return (
        <div className="mg-nav" data-toggle="nav">
            {parse(linkList)}
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

module.exports = {
    RenderHeader,
}