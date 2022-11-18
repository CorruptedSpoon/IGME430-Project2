const parse = require('html-react-parser');

const NavHeader = (props) => {
    const linkList = props.links.reduce((acc, link) => 
        acc + `<li><a href="${link.href}">${link.text}</a></li>`, '<ul>') + '</ul>';

    return (
        <header>
            <span>Logo </span>
            <nav>
                {parse(linkList)}
            </nav>
        </header>
    );
};

module.exports = {
    NavHeader,
}