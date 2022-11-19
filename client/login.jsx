const helper = require('./helper.js');
const { NavHeader, RenderHeader } = require('./components.jsx');

const circles = [];

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!username || !pass) {
        helper.handleError('all fields are required');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, _csrf});
    
    return false;
};

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;
    const _csrf = e.target.querySelector('#_csrf').value;

    if(!username || !pass || !pass2) {
        helper.handleError('all fields are required');
        return false;
    }

    if(pass !== pass2) {
        helper.handleError('passwords do not match');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass, pass2, _csrf});
    
    return false;
};

const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <div className="mg-container">
                <div className="mg-row"><label htmlFor="username">Username: </label></div>
                <div className="mg-row"><input id="user" type="text" name="username" placeholder="username" /></div>
                <div className="mg-row"><label htmlFor="pass">Password: </label></div>
                <div className="mg-row"><input id="pass" type="password" name="pass" placeholder="password" /></div>
                <div className="mg-row">
                    <div className="mg-col mg-x--center">
                        <div className="mg-row">
                            <input className="formSubmit button--outline" type="submit" value="Sign in" />
                        </div>
                    </div>
                </div>
                <input id="_csrf" type="hidden" name="_csrf" value={props.csrf} />
                <div id="errorMessage" className="hidden mg-row mg-x--center">
                    <p className="center-text"><span id="errorText"></span></p>
                </div>
            </div>
        </form>
    );
};

const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <div className="mg-container">
                <div className="mg-row"><label htmlFor="username">Username: </label></div>
                <div className="mg-row"><input id="user" type="text" name="username" placeholder="username" /></div>
                <div className="mg-row"><label htmlFor="pass">Password: </label></div>
                <div className="mg-row"><input id="pass" type="password" name="pass" placeholder="password" /></div>
                <div className="mg-row"><label htmlFor="pass2">Password: </label></div>
                <div className="mg-row"><input id="pass2" type="password" name="pass2" placeholder="retype password" /></div>
                <div className="mg-row">
                    <div className="mg-col mg-x--center">
                        <div className="mg-row">
                            <input className="formSubmit button--outline" type="submit" value="Sign in" />
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

const animateCanvas = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    const circleRadius = 230;
    const circleSpeed = 1.3;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle='rgba(255, 240, 147, 0.03)';

    const moveCircle = (circleIndex) => {
        const circle = circles[circleIndex];

        // if the direction is 0, generate a new random direction vector
        if(circle.dirX === 0 && circle.dirY === 0) {
            circle.dirX = Math.random() * 3 - 1;
            circle.dirY = Math.random() * 3 - 1;

            // normalize the direction vector
            const length = Math.sqrt(circle.dirX * circle.dirX + circle.dirY * circle.dirY);
            circle.dirX /= length;
            circle.dirY /= length;

            // set the position to a random position on the screen
            circle.x = Math.random() * width;
            circle.y = Math.random() * height;
        }

        // if the center circle is colliding with the edge of the canvas, reverse the direction
        if(circle.x < 0 || circle.x > width) {
            circle.dirX *= -1;
        }
        if(circle.y < 0 || circle.y > height) {
            circle.dirY *= -1;
        }

        // move the circle
        circle.x += circle.dirX * circleSpeed;
        circle.y += circle.dirY * circleSpeed;
        
        // draw the circle to the canvas
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circleRadius, 0, 2 * Math.PI);
        ctx.fill();
    }

    for(let i = 0; i < circles.length; i++) {
        moveCircle(i);
    }
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();
    const links = [
        {href: '/login', text: 'Login', id: 'loginButton', current: false},
        {href: '/signup', text: 'Signup', id: 'signupButton', current: false},
    ];

    RenderHeader(links, 'loginButton');

    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        RenderHeader(links, 'loginButton');
        ReactDOM.render(
            <LoginWindow csrf={data.csrfToken} />,
            document.getElementById('content')
        );
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        RenderHeader(links, 'signupButton');
        ReactDOM.render(
            <SignupWindow csrf={data.csrfToken} />,
            document.getElementById('content')
        );
        return false;
    });

    ReactDOM.render(
        <LoginWindow csrf={data.csrfToken} />,
        document.getElementById('content')
    );
    
    const numCircles = 6;
    for( let i = 0; i < numCircles; i++) {
        circles.push({x: 0, y: 0, dirX: 0, dirY: 0});
    }
    setInterval(animateCanvas, 1);
};

window.onload = init;