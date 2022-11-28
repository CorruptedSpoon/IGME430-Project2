/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 235:
/***/ ((module) => {

// props contains an array of link objects with href, text, id, and current properties
// href is the link destination
// text is the link text
// id is the id of the form element
// current is a boolean that determines if the link is active
// returns a nav component with links based on the props
const NavHeader = props => {
  const navList = props.links.map(link => {
    if (link.current) {
      return /*#__PURE__*/React.createElement("li", {
        id: link.id,
        className: "active",
        key: link.id
      }, /*#__PURE__*/React.createElement("a", {
        href: link.href
      }, link.text));
    } else {
      return /*#__PURE__*/React.createElement("li", {
        id: link.id,
        key: link.id
      }, /*#__PURE__*/React.createElement("a", {
        href: link.href
      }, link.text));
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "mg-nav",
    "data-toggle": "nav"
  }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", {
    id: "logo"
  }, /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("a", {
    href: "/"
  }, "Stage"))), navList));
};

// takes the link array and the id of the current page
// renders the NavHeader component
const RenderHeader = (links, activeId) => {
  links.map(link => link.current = link.id === activeId);
  ReactDOM.render( /*#__PURE__*/React.createElement(NavHeader, {
    links: links
  }), document.getElementById('header'));
};
module.exports = {
  RenderHeader
};

/***/ }),

/***/ 603:
/***/ ((module) => {

/* Takes in an error message. Sets the error message up in html, and
   displays it to the user. Will be hidden by other events that could
   end in an error.
*/
const handleError = message => {
  document.getElementById('errorAlert').textContent = message;
  document.getElementById('errorAlert').classList.remove('hidden');
};

/* Sends post requests to the server using fetch. Will look for various
    entries in the response JSON object, and will handle them appropriately.
*/
const sendPost = async (url, data, handler) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  document.getElementById('errorMessage').classList.add('hidden');
  if (result.error) {
    handleError(result.error);
  }
  if (result.redirect) {
    window.location = result.redirect;
  }
  if (handler) {
    handler(result);
  }
};
const hideError = () => {
  document.getElementById('errorAlert').classList.add('hidden');
};
module.exports = {
  handleError,
  sendPost,
  hideError
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const helper = __webpack_require__(603);
const {
  RenderHeader
} = __webpack_require__(235);
const circles = [];
const handleLogin = e => {
  e.preventDefault();
  helper.hideError();
  const username = e.target.querySelector('#user').value;
  const pass = e.target.querySelector('#pass').value;
  const _csrf = e.target.querySelector('#_csrf').value;
  if (!username || !pass) {
    helper.handleError('all fields are required');
    return false;
  }
  helper.sendPost(e.target.action, {
    username,
    pass,
    _csrf
  });
  return false;
};
const handleSignup = e => {
  e.preventDefault();
  helper.hideError();
  const username = e.target.querySelector('#user').value;
  const pass = e.target.querySelector('#pass').value;
  const pass2 = e.target.querySelector('#pass2').value;
  const _csrf = e.target.querySelector('#_csrf').value;
  if (!username || !pass || !pass2) {
    helper.handleError('all fields are required');
    return false;
  }
  if (pass !== pass2) {
    helper.handleError('passwords do not match');
    return false;
  }
  helper.sendPost(e.target.action, {
    username,
    pass,
    pass2,
    _csrf
  });
  return false;
};
const LoginWindow = props => {
  return /*#__PURE__*/React.createElement("form", {
    id: "loginForm",
    name: "loginForm",
    onSubmit: handleLogin,
    action: "/login",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: ")), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "username"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password: ")), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col mg-x--center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("input", {
    className: "formSubmit button--outline",
    type: "submit",
    value: "Sign in"
  })))), /*#__PURE__*/React.createElement("input", {
    id: "_csrf",
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("div", {
    id: "errorMessage",
    className: "hidden mg-row mg-x--center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "center-text"
  }, /*#__PURE__*/React.createElement("span", {
    id: "errorText"
  })))));
};
const SignupWindow = props => {
  return /*#__PURE__*/React.createElement("form", {
    id: "signupForm",
    name: "signupForm",
    onSubmit: handleSignup,
    action: "/signup",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: ")), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "username"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password: ")), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "password"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass2"
  }, "Password: ")), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("input", {
    id: "pass2",
    type: "password",
    name: "pass2",
    placeholder: "retype password"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col mg-x--center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("input", {
    className: "formSubmit button--outline",
    type: "submit",
    value: "Sign in"
  })))), /*#__PURE__*/React.createElement("input", {
    id: "_csrf",
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("div", {
    id: "errorMessage",
    className: "hidden mg-row mg-row mg-x--center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "center-text"
  }, /*#__PURE__*/React.createElement("span", {
    id: "errorText"
  })))));
};

// animates circles on login page
const animateCanvas = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;
  const circleRadius = 230;
  const circleSpeed = 3;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(255, 240, 147, 0.05)';
  const moveCircle = circleIndex => {
    const circle = circles[circleIndex];

    // if the direction is 0, generate a new random direction vector
    if (circle.dirX === 0 && circle.dirY === 0) {
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

    // if the center of the circle is colliding with the edge of the canvas, reverse the direction
    if (circle.x < 0 || circle.x > width) {
      circle.dirX *= -1;
    }
    if (circle.y < 0 || circle.y > height) {
      circle.dirY *= -1;
    }

    // move the circle
    circle.x += circle.dirX * circleSpeed;
    circle.y += circle.dirY * circleSpeed;

    // draw the circle to the canvas
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circleRadius, 0, 2 * Math.PI);
    ctx.fill();
  };
  for (let i = 0; i < circles.length; i++) {
    moveCircle(i);
  }
};
const init = async () => {
  const response = await fetch('/getToken');
  const data = await response.json();
  const links = [{
    href: '/login',
    text: 'Login',
    id: 'loginButton',
    current: false
  }, {
    href: '/signup',
    text: 'Signup',
    id: 'signupButton',
    current: false
  }];
  RenderHeader(links, 'loginButton');
  const loginButton = document.getElementById('loginButton');
  const signupButton = document.getElementById('signupButton');
  loginButton.addEventListener('click', e => {
    e.preventDefault();
    RenderHeader(links, 'loginButton');
    ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
      csrf: data.csrfToken
    }), document.getElementById('content'));
    return false;
  });
  signupButton.addEventListener('click', e => {
    e.preventDefault();
    RenderHeader(links, 'signupButton');
    ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {
      csrf: data.csrfToken
    }), document.getElementById('content'));
    return false;
  });
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
    csrf: data.csrfToken
  }), document.getElementById('content'));

  // start the update loop for the circles animation
  const numCircles = 6;
  for (let i = 0; i < numCircles; i++) {
    circles.push({
      x: 0,
      y: 0,
      dirX: 0,
      dirY: 0
    });
  }
  setInterval(animateCanvas, 500 / 60);
};
window.onload = init;
})();

/******/ })()
;