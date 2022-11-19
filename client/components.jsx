const parse = require('html-react-parser');

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
    NavHeader,
    RenderHeader
}