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
const {
  RenderHeader,
  PostView
} = __webpack_require__(235);
const AccountOptions = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "mg-row fill-height",
    id: "account-options"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col mg-x6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-nav",
    "data-toggle": "nav"
  }, /*#__PURE__*/React.createElement("ul", {
    id: "account-nav",
    className: "post-box"
  }, /*#__PURE__*/React.createElement("li", {
    id: "account-title"
  }, /*#__PURE__*/React.createElement("h2", null, "My Account")), /*#__PURE__*/React.createElement("li", {
    id: "premium-indicator",
    className: "hidden"
  }, /*#__PURE__*/React.createElement("p", null, "Premium User")), /*#__PURE__*/React.createElement("li", {
    id: "myPosts"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/account"
  }, "My Posts")), /*#__PURE__*/React.createElement("li", {
    id: "premium"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/account"
  }, "Stage Premium")), /*#__PURE__*/React.createElement("li", {
    id: "changePassButton"
  }, /*#__PURE__*/React.createElement("a", {
    href: "/account"
  }, "Change Password")), /*#__PURE__*/React.createElement("li", {
    id: "ex1"
  }, /*#__PURE__*/React.createElement("a", null, "Example Option 1")), /*#__PURE__*/React.createElement("li", {
    id: "ex2"
  }, /*#__PURE__*/React.createElement("a", null, "Example Option 2")), /*#__PURE__*/React.createElement("li", {
    id: "ex3"
  }, /*#__PURE__*/React.createElement("a", null, "Example Option 3"))), /*#__PURE__*/React.createElement("div", {
    className: "mg-col mg-x--center"
  }))));
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
  RenderHeader(links, 'accountButton');
  const postButton = document.getElementById('postButton');
  const stageButton = document.getElementById('stageButton');
  const accountButton = document.getElementById('accountButton');
  const logoutButton = document.getElementById('logoutButton');
  postButton.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = '/post';
    return false;
  });
  stageButton.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = '/stage';
    return false;
  });
  accountButton.addEventListener('click', e => {
    e.preventDefault();
    return false;
  });
  ReactDOM.render( /*#__PURE__*/React.createElement(AccountOptions, null), document.getElementById('content'));
};
window.onload = init;
})();

/******/ })()
;