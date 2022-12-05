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
const PostView = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "mg-row post-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col mg-x--center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "post-title"
  }, props.title)), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "post-username"
  }, props.username)), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("p", null, props.body)), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-x--center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "button button--small button--link inactive",
    id: "likeButton"
  }, /*#__PURE__*/React.createElement("img", {
    className: "imgButton",
    src: "/assets/img/like-inactive.png",
    alt: "like",
    id: "likeImg"
  })), /*#__PURE__*/React.createElement("p", {
    className: "center-text small-text",
    id: "likeNum"
  }, props.likes)), /*#__PURE__*/React.createElement("div", {
    className: "mg-x--center"
  }, /*#__PURE__*/React.createElement("button", {
    className: "button button--small button--link",
    id: "newButton"
  }, /*#__PURE__*/React.createElement("img", {
    className: "imgButton",
    src: "/assets/img/new-inactive.png",
    alt: "new"
  })), /*#__PURE__*/React.createElement("p", {
    className: "center-text small-text"
  }, "new post")))));
};
const ErrorAlert = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "mg-alert warning",
    id: "errorAlert"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mg-alert--closebtn mg-icon-close",
    onClick: e => e.currentTarget.parentElement.classList.toggle('hidden')
  }), props.message);
};
const HandleError = message => {
  ReactDOM.render( /*#__PURE__*/React.createElement(ErrorAlert, {
    message: message
  }), document.getElementById('error'));
  document.getElementById('errorAlert').classList.remove('hidden');
};
module.exports = {
  RenderHeader,
  PostView,
  ErrorAlert,
  HandleError
};

/***/ }),

/***/ 603:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const {
  HandleError
} = __webpack_require__(235);

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
  if (result.error) {
    HandleError(result.error);
  }
  if (result.redirect) {
    window.location = result.redirect;
  }
  if (handler) {
    handler(result);
  }
};
module.exports = {
  sendPost
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
  RenderHeader,
  ErrorAlert,
  HandleError
} = __webpack_require__(235);
const handlePost = e => {
  e.preventDefault();
  const title = e.target.querySelector('#title').value;
  const body = e.target.querySelector('#body').value;
  const _csrf = e.target.querySelector('#_csrf').value;
  if (!title || !body) {
    HandleError('all fields are required');
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
  }, /*#__PURE__*/React.createElement("input", {
    id: "title",
    type: "text",
    name: "title",
    placeholder: "title"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("textarea", {
    id: "body",
    type: "text",
    name: "body",
    placeholder: "what's on your mind?"
  })), /*#__PURE__*/React.createElement("div", {
    id: "error"
  }), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col mg-x--center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("input", {
    className: "formSubmit button--outline",
    type: "submit",
    value: "stage it"
  })))), /*#__PURE__*/React.createElement("input", {
    id: "_csrf",
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  })));
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
    href: '/account',
    text: 'Account',
    id: 'accountButton',
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
  const accountButton = document.getElementById('accountButton');
  postButton.addEventListener('click', e => {
    e.preventDefault();
    return false;
  });
  stageButton.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = '/stage';
    return false;
  });
  accountButton.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = '/account';
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