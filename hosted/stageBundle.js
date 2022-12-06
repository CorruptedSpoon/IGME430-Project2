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

// props contains the title, body, username, and likes of the post
// generates a post component. If being displayed on the myposts page, the 'new post' button is hidden
const PostView = props => {
  let newButton = /*#__PURE__*/React.createElement("div", null);
  if (!props.myposts) {
    newButton = /*#__PURE__*/React.createElement("div", {
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
    }, "new post"));
  }
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
  }, props.likes)), newButton)));
};

// props contains the error message
// generates an error alert component
const ErrorAlert = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "mg-alert warning",
    id: "errorAlert"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mg-alert--closebtn mg-icon-close",
    onClick: e => e.currentTarget.parentElement.classList.toggle('hidden')
  }), props.message);
};

// creates an error alert with the given message and renders it in the error div
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
const {
  RenderHeader,
  PostView,
  HandleError
} = __webpack_require__(235);
const helper = __webpack_require__(603);

// this component displays a single post chosen based on a score
// for testing purposes, it will display a random post from the database
// because of low volume of posts and users
const StageWindow = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "mg-container"
  }, /*#__PURE__*/React.createElement(PostView, {
    title: props.title,
    body: props.body,
    username: props.username,
    likes: props.likes
  }));
};
const init = async () => {
  let currentPost;
  const tokenRes = await fetch('/getToken');
  const token = await tokenRes.json();
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
  RenderHeader(links, 'stageButton');
  const postButton = document.getElementById('postButton');
  const stageButton = document.getElementById('stageButton');
  const accountButton = document.getElementById('accountButton');
  postButton.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = '/post';
    return false;
  });
  stageButton.addEventListener('click', e => {
    e.preventDefault();
    return false;
  });
  accountButton.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = '/account';
    return false;
  });

  // get a random post from the database and updates its score
  // displays the post in the StageWindow component
  const getPost = async () => {
    const response = await fetch('/randomPost');
    currentPost = await response.json();
    if (currentPost.error) {
      HandleError(currentPost.error);
    } else {
      helper.sendPost('/updateScore', {
        id: currentPost.post._id,
        _csrf: token.csrfToken
      });
      ReactDOM.render( /*#__PURE__*/React.createElement(StageWindow, {
        title: currentPost.post.title,
        body: currentPost.post.body,
        username: currentPost.post.username,
        likes: currentPost.post.likes
      }), document.getElementById('content'));
    }
  };
  await getPost();
  const likeButton = document.getElementById('likeButton');
  const newButton = document.getElementById('newButton');

  // handles the like button, toggling between active and inactive when adding and removing likes
  likeButton.addEventListener('click', async e => {
    e.preventDefault();
    const likeNum = document.getElementById('likeNum');
    if (likeButton.className.includes('inactive')) {
      helper.sendPost('/addLike', {
        id: currentPost.post._id,
        _csrf: token.csrfToken
      });
      likeNum.textContent = parseInt(likeNum.textContent) + 1;
      likeButton.className = likeButton.className.replace('inactive', 'active');
      document.getElementById('likeImg').src = '/assets/img/like-active.png';
    } else {
      helper.sendPost('/removeLike', {
        id: currentPost.post._id,
        _csrf: token.csrfToken
      });
      likeNum.textContent = parseInt(likeNum.textContent) - 1;
      likeButton.className = likeButton.className.replace('active', 'inactive');
      document.getElementById('likeImg').src = '/assets/img/like-inactive.png';
    }
  });

  // handles the new button, getting a new post from the database
  newButton.addEventListener('click', async e => {
    e.preventDefault();
    document.getElementById('likeButton').className = 'button button--small button--link inactive';
    document.getElementById('likeImg').src = '/assets/img/like-inactive.png';
    getPost();
  });
};
window.onload = init;
})();

/******/ })()
;