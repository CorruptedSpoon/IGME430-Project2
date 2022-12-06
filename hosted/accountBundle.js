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

// the main account page options
const AccountOptions = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: "mg-row fill-height",
    id: "account-options"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-nav",
    "data-toggle": "nav"
  }, /*#__PURE__*/React.createElement("ul", {
    id: "account-nav",
    className: "ui-box"
  }, /*#__PURE__*/React.createElement("li", {
    id: "account-title"
  }, /*#__PURE__*/React.createElement("h2", null, "My Account")), /*#__PURE__*/React.createElement("li", {
    id: "premium-indicator",
    className: "hidden"
  }, /*#__PURE__*/React.createElement("p", null, "Stage Premium active")), /*#__PURE__*/React.createElement("li", {
    id: "padding"
  }), /*#__PURE__*/React.createElement("li", {
    id: "myPosts",
    className: "active"
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
  }, /*#__PURE__*/React.createElement("a", null, "Another Example"))), /*#__PURE__*/React.createElement("div", {
    className: "mg-col mg-x--center"
  }))));
};

// generates a component containing a list of PostViews for each of the users posts
const MyPosts = props => {
  const postList = props.posts.map(post => {
    return /*#__PURE__*/React.createElement(PostView, {
      title: post.title,
      body: post.body,
      username: post.username,
      likes: post.likes,
      myposts: true,
      key: post._id
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "mg-row fill-height",
    id: "my-posts"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col"
  }, postList));
};

// the form component for purchasing Stage Premium
const StagePremium = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "mg-row fill-height ui-box",
    id: "stage-premium"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col mg-x--center"
  }, /*#__PURE__*/React.createElement("h2", null, "Stage Premium"), /*#__PURE__*/React.createElement("p", null, "Stage Premium disables the maximum daily post limit for only $5 per month."), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Enter Card Information"), /*#__PURE__*/React.createElement("form", {
    id: "credit-card-form"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "card-number"
  }, "Card Number"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "card-number",
    name: "card-number"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "card-exp"
  }, "Expiration Date"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "card-exp",
    name: "card-exp"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mg-col"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "card-cvv"
  }, "CVV"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "card-cvv",
    name: "card-cvv"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "card-zip"
  }, "Zip Code"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "card-zip",
    name: "card-zip"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col",
    id: "error"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col"
  }, /*#__PURE__*/React.createElement("h6", {
    id: "confirm",
    className: "hidden"
  }, "Purchase Successful"))), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    id: "submit-credit-card"
  }, "Submit (fields not required)"))))))));
};

// the form component for changing the users password
const ChangePassword = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "mg-row ui-box",
    id: "change-password"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col mg-x--center"
  }, /*#__PURE__*/React.createElement("h2", null, "Change Password"), /*#__PURE__*/React.createElement("form", {
    className: "fill-width",
    id: "change-password-form"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "old-password"
  }, "Old Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    id: "old-password",
    name: "old-password"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "new-password"
  }, "New Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    id: "new-password",
    name: "new-password"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "confirm-password"
  }, "Confirm Password"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    id: "confirm-password",
    name: "confirm-password"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col",
    id: "error"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col"
  }, /*#__PURE__*/React.createElement("h6", {
    id: "confirm",
    className: "hidden"
  }, "Password Updated"))), /*#__PURE__*/React.createElement("div", {
    className: "mg-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mg-col"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    id: "submit-password-change"
  }, "Submit"))))));
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
  const premiumRes = await fetch('/hasPremium');
  const premiumData = await premiumRes.json();
  // if the user has premium, show the premium indicator
  if (premiumData.premium) {
    document.getElementById('premium-indicator').classList.remove('hidden');
  }

  // gets the users posts and renders them with the MyPosts component
  const renderMyPosts = async () => {
    const response = await fetch('/getPosts');
    const data = await response.json();
    if (data.error) {
      HandleError(data.error);
    } else {
      ReactDOM.render( /*#__PURE__*/React.createElement(MyPosts, {
        posts: data.posts
      }), document.getElementById('subContent'));
    }
  };
  renderMyPosts();
  const myPosts = document.getElementById('myPosts');
  const premium = document.getElementById('premium');
  const changePassButton = document.getElementById('changePassButton');
  myPosts.addEventListener('click', e => {
    e.preventDefault();
    myPosts.classList.add('active');
    premium.classList.remove('active');
    changePassButton.classList.remove('active');
    renderMyPosts();
    return false;
  });

  // renders the premium form
  // submitting the form will give premium regardless of the credit card info
  premium.addEventListener('click', e => {
    e.preventDefault();
    myPosts.classList.remove('active');
    premium.classList.add('active');
    changePassButton.classList.remove('active');
    ReactDOM.render( /*#__PURE__*/React.createElement(StagePremium, null), document.getElementById('subContent'));
    const submitCreditCard = document.getElementById('submit-credit-card');
    submitCreditCard.addEventListener('click', async e => {
      e.preventDefault();
      helper.sendPost('/givePremium', {
        _csrf: data.csrfToken
      }, res => {
        if (res.message) {
          // display a success message
          document.getElementById('premium-indicator').classList.remove('hidden');
          document.getElementById('confirm').classList.remove('hidden');
        }
      });
      return false;
    });
    return false;
  });

  // renders the change password form
  // if all values are valid, the password will be changed and a success message will be displayed
  changePassButton.addEventListener('click', e => {
    e.preventDefault();
    myPosts.classList.remove('active');
    premium.classList.remove('active');
    changePassButton.classList.add('active');
    ReactDOM.render( /*#__PURE__*/React.createElement(ChangePassword, null), document.getElementById('subContent'));
    const submitPasswordChange = document.getElementById('submit-password-change');
    submitPasswordChange.addEventListener('click', async e => {
      e.preventDefault();
      const oldPass = document.getElementById('old-password').value;
      const newPass = document.getElementById('new-password').value;
      const newPass2 = document.getElementById('confirm-password').value;
      if (newPass !== newPass2) {
        HandleError('Passwords do not match');
      } else {
        helper.sendPost('/changePassword', {
          oldPass,
          newPass,
          newPass2,
          _csrf: data.csrfToken
        }, res => {
          // display a success message
          if (res.message) document.getElementById('confirm').classList.remove('hidden');
        });
      }
      return false;
    });
    return false;
  });
};
window.onload = init;
})();

/******/ })()
;