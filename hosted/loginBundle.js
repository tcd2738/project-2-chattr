/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/helper.js":
/*!**************************!*\
  !*** ./client/helper.js ***!
  \**************************/
/***/ ((module) => {

eval("// Take in error message, and display it to the user.\nconst handleError = message => {\n  document.getElementById('errorText').textContent = message;\n  document.getElementById('errorMessage').classList.remove('hidden');\n  setTimeout(() => {\n    document.getElementById('errorMessage').classList.add('hidden');\n  }, 8000);\n}; // Location errors get their own seperate field as they refresh quite frequently.\n\n\nconst handleLocationError = message => {\n  document.getElementById('locationErrorText').textContent = message;\n  document.getElementById('locationErrorMessage').classList.remove('hidden');\n  setTimeout(() => {\n    document.getElementById('locationErrorMessage').classList.add('hidden');\n  }, 8000);\n}; // Sends requests with body data to the server. Will handle returns appropriately.\n\n\nconst sendRequest = async (method, url, data, handler) => {\n  const response = await fetch(url, {\n    method: method,\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  document.getElementById('errorMessage').classList.add('hidden');\n\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n\n  if (result.error) {\n    handleError(result.error);\n  }\n\n  if (handler) {\n    handler(result);\n  }\n}; // Accesses the browser's navigator object, and pulls location data.\n\n\nconst getLocation = async () => {\n  const lResult = await navigator.geolocation.getCurrentPosition(position => {\n    const loc = {\n      latitude: position.coords.latitude,\n      longitude: position.coords.longitude\n    };\n    return loc;\n  });\n  return lResult;\n};\n\nmodule.exports = {\n  handleError,\n  handleLocationError,\n  sendRequest,\n  getLocation\n};\n\n//# sourceURL=webpack://chattr/./client/helper.js?");

/***/ }),

/***/ "./client/login.jsx":
/*!**************************!*\
  !*** ./client/login.jsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\"); // Window that displays form for logging in.\n\n\nconst LoginWindow = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"loginForm\",\n    name: \"loginForm\",\n    onSubmit: handleLogin,\n    action: \"/login\",\n    method: \"POST\",\n    className: \"mainForm\"\n  }, /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"username\"\n  }, \"Username: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"user\",\n    type: \"text\",\n    name: \"username\",\n    placeholder: \"username\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"pass\"\n  }, \"Password: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"pass\",\n    type: \"password\",\n    name: \"pass\",\n    placeholder: \"password\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"formSubmit\",\n    type: \"submit\",\n    value: \"Sign In\"\n  }));\n}; // Window that displays form for signing up.\n\n\nconst SignupWindow = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"signupForm\",\n    name: \"signupForm\",\n    onSubmit: handleSignup,\n    action: \"/signup\",\n    method: \"POST\",\n    className: \"mainForm\"\n  }, /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"username\"\n  }, \"Username: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"user\",\n    type: \"text\",\n    name: \"username\",\n    placeholder: \"username\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"pass\"\n  }, \"Password: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"pass\",\n    type: \"password\",\n    name: \"pass\",\n    placeholder: \"password\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"pass2\"\n  }, \"Password: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"pass2\",\n    type: \"password\",\n    name: \"pass2\",\n    placeholder: \"retype password\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"formSubmit\",\n    type: \"submit\",\n    value: \"Sign Up\"\n  }));\n}; // Window that displays form for changing password.\n\n\nconst ChangePasswordWindow = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"changePasswordForm\",\n    name: \"changePasswordForm\",\n    onSubmit: handlePasswordChange,\n    action: \"/changePassword\",\n    method: \"POST\",\n    className: \"mainForm\"\n  }, /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"username\"\n  }, \"Username: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"user\",\n    type: \"text\",\n    name: \"username\",\n    placeholder: \"username\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"oldPass\"\n  }, \"Old Password: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"oldPass\",\n    type: \"password\",\n    name: \"oldPass\",\n    placeholder: \"old password\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"newPass\"\n  }, \"New Password: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"newPass\",\n    type: \"password\",\n    name: \"newPass\",\n    placeholder: \"new password\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"newPass2\"\n  }, \"New Password: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"newPass2\",\n    type: \"password\",\n    name: \"newPass2\",\n    placeholder: \"retype new password\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"formSubmit\",\n    type: \"submit\",\n    value: \"Change Password\"\n  }));\n}; // Log into account based on data from loginForm.\n\n\nconst handleLogin = e => {\n  e.preventDefault();\n  const username = e.target.querySelector('#user').value;\n  const pass = e.target.querySelector('#pass').value;\n  const _csrf = e.target.querySelector('#_csrf').value;\n\n  if (!username || !pass) {\n    helper.handleError('Username or password is empty!');\n    return false;\n  }\n\n  helper.sendRequest('POST', e.target.action, {\n    username,\n    pass,\n    _csrf\n  });\n  return false;\n}; // Create an account based on signupForm.\n\n\nconst handleSignup = e => {\n  e.preventDefault();\n  const username = e.target.querySelector('#user').value;\n  const pass = e.target.querySelector('#pass').value;\n  const pass2 = e.target.querySelector('#pass2').value;\n  const _csrf = e.target.querySelector('#_csrf').value;\n\n  if (!username || !pass || !pass2) {\n    helper.handleError('All fields are required!');\n    return false;\n  }\n\n  if (pass != pass2) {\n    helper.handleError('Passwords do not match!');\n    return false;\n  }\n\n  helper.sendRequest('POST', e.target.action, {\n    username,\n    pass,\n    pass2,\n    _csrf\n  });\n  return false;\n}; // Change password based on info from changePasswordForm.\n\n\nconst handlePasswordChange = e => {\n  e.preventDefault();\n  const username = e.target.querySelector('#user').value;\n  const oldPass = e.target.querySelector('#oldPass').value;\n  const newPass = e.target.querySelector('#newPass').value;\n  const newPass2 = e.target.querySelector('#newPass2').value;\n  const _csrf = e.target.querySelector('#_csrf').value;\n\n  if (!username || !oldPass || !newPass || !newPass2) {\n    helper.handleError('All fields are required!');\n    return false;\n  }\n\n  if (newPass != newPass2) {\n    helper.handleError('New passwords do not match!');\n    return false;\n  }\n\n  helper.sendRequest('POST', e.target.action, {\n    username,\n    oldPass,\n    newPass,\n    newPass2,\n    _csrf\n  });\n  return false;\n}; // Initialize all the components needed for the login page.\n\n\nconst init = async () => {\n  // Get security data up front.\n  const response = await fetch('/getToken');\n  const data = await response.json(); // Find necessary elements and add click handlers.\n\n  const loginButton = document.getElementById('mainLoginButton');\n  const signupButton = document.getElementById('signupButton');\n  const changePasswordButton = document.getElementById('changePasswordButton');\n  loginButton.addEventListener('click', e => {\n    e.preventDefault();\n    mainPageLoad(data.csrfToken);\n    return false;\n  });\n  signupButton.addEventListener('click', e => {\n    e.preventDefault();\n    ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {\n      csrf: data.csrfToken\n    }), document.getElementById('content'));\n    return false;\n  });\n  changePasswordButton.addEventListener('click', e => {\n    e.preventDefault();\n    ReactDOM.render( /*#__PURE__*/React.createElement(ChangePasswordWindow, {\n      csrf: data.csrfToken\n    }), document.getElementById('content'));\n    return false;\n  });\n  mainPageLoad(data.csrfToken);\n}; // Loads the main login page and all necessary requirements.\n\n\nconst mainPageLoad = _csrf => {\n  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {\n    csrf: _csrf\n  }), document.getElementById('content'));\n  return false;\n};\n\nwindow.onload = init;\n\n//# sourceURL=webpack://chattr/./client/login.jsx?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/login.jsx");
/******/ 	
/******/ })()
;