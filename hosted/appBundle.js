/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
const handleDomo = e => {
  e.preventDefault();
  helper.hideError();
  const name = e.target.querySelector('#domoName').value;
  const age = e.target.querySelector('#domoAge').value;
  const money = e.target.querySelector('#domoMoney').value;
  const _csrf = e.target.querySelector('#_csrf').value;
  if (!name || !age) {
    helper.handleError('All fields are required!');
    return false;
  }
  helper.sendPost(e.target.action, {
    name,
    age,
    money,
    _csrf
  }, loadDomosFromServer);
  return false;
};
const handleGiveMoney = (e, id, money) => {
  e.preventDefault();
  helper.hideError();
  const _csrf = e.target.parentNode.querySelector('#_csrf').value;
  helper.sendPost('/giveMoney', {
    id,
    money,
    _csrf
  }, loadDomosFromServer);
  return false;
};
const DomoForm = props => {
  return /*#__PURE__*/React.createElement("form", {
    id: "domoForm",
    onSubmit: handleDomo,
    name: "domoForm",
    action: "/maker",
    method: "POST",
    className: "domoForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name",
    id: "nameLabel"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "domoName",
    type: "text",
    name: "name",
    placeholder: "Domo Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "age"
  }, "Age: "), /*#__PURE__*/React.createElement("input", {
    id: "domoAge",
    type: "number",
    min: "0",
    name: "age"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "money"
  }, "Money: "), /*#__PURE__*/React.createElement("input", {
    id: "domoMoney",
    type: "number",
    min: "0",
    name: "money"
  }), /*#__PURE__*/React.createElement("input", {
    id: "_csrf",
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeDomoSubmit",
    type: "submit",
    value: "Make Domo"
  }));
};
const DomoList = props => {
  if (props.domos.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "domoList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyDomo"
    }, "No Domos Yet!"));
  }
  const domoNodes = props.domos.map(domo => {
    return /*#__PURE__*/React.createElement("div", {
      key: domo._id,
      className: "domo"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/domoface.jpeg",
      alt: "domo face",
      className: "domoFace"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "domoName"
    }, "Name: ", domo.name), /*#__PURE__*/React.createElement("h3", {
      className: "domoAge"
    }, "Age: ", domo.age), /*#__PURE__*/React.createElement("h3", {
      className: "domoMoney"
    }, "Money: ", domo.money), /*#__PURE__*/React.createElement("input", {
      id: "giveMoney",
      type: "button",
      value: "Give Money",
      onClick: e => handleGiveMoney(e, domo._id, domo.money)
    }), /*#__PURE__*/React.createElement("input", {
      id: "_csrf",
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "domoList"
  }, domoNodes);
};
const loadDomosFromServer = async () => {
  const response = await fetch('/getDomos');
  const data = await response.json();
  const tokenRes = await fetch('/getToken');
  const tokenData = await tokenRes.json();
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
    domos: data.domos,
    csrf: tokenData.csrfToken
  }), document.getElementById('domos'));
};
const init = async () => {
  const response = await fetch('/getToken');
  const data = await response.json();
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoForm, {
    csrf: data.csrfToken
  }), document.getElementById('makeDomo'));
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
    domos: [],
    csrf: data.csrfToken
  }), document.getElementById('domos'));
  loadDomosFromServer();
};
window.onload = init;
})();

/******/ })()
;