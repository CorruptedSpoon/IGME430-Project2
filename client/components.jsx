const NavHeader = (props) => {
    const linkList = '<ul>';
    linkList += props.links.reduce(acc, (link) => 
        acc + `<li><a href="${link.href}">${link.text}</a></li>`, '');

    return (
        <header id='header'>
            <span>Logo </span>
            <nav><ul>
                <li>
                    <a href = ''>Home </a>
                </li>
                <li>
                    <a href = '#!'>About </a>
                </li>
                <li>
                    <a href = '#!'>Services </a>

                </li>
                <li>
                    <a href = '#!'>Contact us </a>
                </li>

            </ul></nav>
        </header>




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