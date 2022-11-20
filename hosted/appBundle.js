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
  document.getElementById('errorText').textContent = message;
  document.getElementById('errorMessage').classList.remove('hidden');
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
  document.getElementById('errorMessage').classList.add('hidden');
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
const handlePost = e => {
  e.preventDefault();
  helper.hideError();
  const title = e.target.querySelector('#title').value;
  const body = e.target.querySelector('#body').value;
  const _csrf = e.target.querySelector('#_csrf').value;
  if (!title || !body) {
    helper.handleError('all fields are required');
    return false;
  }
  helper.sendPost(e.target.action, {
    title,
    body,
    _csrf
  });
  return false;
};
const PostWindow = props => {
  return /*#__PURE__*/React.createElement("form", {
    id: "postForm",
    name: "postForm",
    onSubmit: handlePost,
    action: "/post",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "title"
  }, "Title: ")), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("input", {
    id: "title",
    type: "text",
    name: "title",
    placeholder: "title"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("input", {
    id: "body",
    type: "text",
    name: "body",
    placeholder: "what's on your mind?"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col mg-x--center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("input", {
    className: "formSubmit button--outline",
    type: "submit",
    value: "Post"
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
const init = async () => {
  const response = await fetch('/getToken');
  const data = await response.json();
  const links = [{
    href: '/stage',
    text: 'Stage',
    id: 'stageButton',
    current: false
  }, {
    href: '/post',
    text: 'New Post',
    id: 'postButton',
    current: false
  }, {
    href: '/logout',
    text: 'Logout',
    id: 'logoutButton',
    current: false
  }];
  RenderHeader(links, 'postButton');
  const postButton = document.getElementById('postButton');
  const stageButton = document.getElementById('stageButton');
  postButton.addEventListener('click', e => {
    e.preventDefault();
    return false;
  });
  stageButton.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = '/stage';
    return false;
  });
  ReactDOM.render( /*#__PURE__*/React.createElement(PostWindow, {
    csrf: data.csrfToken
  }), document.getElementById('content'));
};
window.onload = init;
})();

/******/ })()
;