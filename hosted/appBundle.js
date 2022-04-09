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

/***/ "./client/app.jsx":
/*!************************!*\
  !*** ./client/app.jsx ***!
  \************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  JarCreationWindow\n} = __webpack_require__(/*! ./app/jar.jsx */ \"./client/app/jar.jsx\");\n\nconst {\n  LocationQuoteWindow\n} = __webpack_require__(/*! ./app/quote.jsx */ \"./client/app/quote.jsx\");\n\nconst {\n  PremiumWindow\n} = __webpack_require__(/*! ./app/premium.jsx */ \"./client/app/premium.jsx\");\n\nconst init = async () => {\n  const response = await fetch('/getToken');\n  const data = await response.json();\n  const makeJarButton = document.getElementById('makeJarButton');\n  const premiumButton = document.getElementById('premiumButton');\n  makeJarButton.addEventListener('click', e => {\n    e.preventDefault();\n    ReactDOM.render( /*#__PURE__*/React.createElement(JarCreationWindow, {\n      csrf: data.csrfToken\n    }), document.getElementById('content'));\n    ReactDOM.render('', document.getElementById('content2'));\n    return false;\n  });\n  premiumButton.addEventListener('click', e => {\n    e.preventDefault();\n    ReactDOM.render( /*#__PURE__*/React.createElement(PremiumWindow, {\n      csrf: data.csrfToken\n    }), document.getElementById('content'));\n    ReactDOM.render('', document.getElementById('content2'));\n    return false;\n  });\n  ReactDOM.render( /*#__PURE__*/React.createElement(LocationQuoteWindow, {\n    csrf: data.csrfToken\n  }), document.getElementById('content'));\n};\n\nwindow.onload = init;\n\n//# sourceURL=webpack://chattr/./client/app.jsx?");

/***/ }),

/***/ "./client/app/jar.jsx":
/*!****************************!*\
  !*** ./client/app/jar.jsx ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ../helper.js */ \"./client/helper.js\");\n\nconst JarCreationWindow = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"jarForm\",\n    onSubmit: handleJar,\n    name: \"jarForm\",\n    action: \"/makeJar\",\n    method: \"POST\",\n    className: \"jarForm\"\n  }, /*#__PURE__*/React.createElement(\"h1\", null, \"Quotes From Your Current Location: \"), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"jarName\"\n  }, \"Jar Name: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"jarName\",\n    type: \"text\",\n    name: \"jarName\",\n    placeholder: \"Jar Name\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"makeJar\",\n    type: \"submit\",\n    value: \"Create Jar\"\n  }));\n};\n\nconst handleJar = async e => {\n  e.preventDefault();\n  helper.hideError();\n  const jarName = e.target.querySelector('#jarName').value;\n  const _csrf = e.target.querySelector(\"#_csrf\").value;\n\n  if (!jarName) {\n    helper.handleError(\"You didn't enter a jar name!\");\n    return false;\n  }\n\n  await helper.sendPost(e.target.action, {\n    jarName,\n    _csrf\n  }); // loadJarsFromServer(_csrf);\n\n  return false;\n};\n\nmodule.exports = {\n  JarCreationWindow\n};\n\n//# sourceURL=webpack://chattr/./client/app/jar.jsx?");

/***/ }),

/***/ "./client/app/premium.jsx":
/*!********************************!*\
  !*** ./client/app/premium.jsx ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ../helper.js */ \"./client/helper.js\");\n\nconst PremiumWindow = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"PremiumForm\",\n    name: \"PremiumForm\",\n    onSubmit: handlePremium,\n    action: \"/setPremium\",\n    method: \"POST\",\n    className: \"mainForm\"\n  }, /*#__PURE__*/React.createElement(\"h2\", null, \"Change Your Premium Status?\"), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"username\"\n  }, \"Username: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"user\",\n    type: \"text\",\n    name: \"username\",\n    placeholder: \"username\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"pass\"\n  }, \"Password: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"pass\",\n    type: \"password\",\n    name: \"pass\",\n    placeholder: \"password\"\n  }), /*#__PURE__*/React.createElement(\"div\", {\n    id: \"premiumChoice\"\n  }, /*#__PURE__*/React.createElement(\"input\", {\n    type: \"radio\",\n    id: \"premiumY\",\n    name: \"premiumChoice\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"premiumY\"\n  }, \"Enroll in premium.\"), /*#__PURE__*/React.createElement(\"br\", null), /*#__PURE__*/React.createElement(\"input\", {\n    type: \"radio\",\n    id: \"premiumN\",\n    name: \"premiumChoice\",\n    value: \"false\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"premiumN\"\n  }, \"Unenroll in premium.\"), /*#__PURE__*/React.createElement(\"br\", null)), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"formSubmit\",\n    type: \"submit\",\n    value: \"Change Premium Status\"\n  }));\n};\n\nconst handlePremium = e => {\n  e.preventDefault();\n  helper.hideError();\n  const username = e.target.querySelector('#user').value;\n  const pass = e.target.querySelector('#pass').value;\n  const _csrf = e.target.querySelector('#_csrf').value;\n  const premiumField = document.getElementsByName('premiumChoice');\n  let premium;\n\n  for (let p of premiumField) {\n    if (p.checked) {\n      premium = p.value;\n    }\n  }\n\n  if (!username || !pass || premium === null) {\n    helper.handleError('All fields are required!');\n    return false;\n  }\n\n  helper.sendPost(e.target.action, {\n    username,\n    pass,\n    premium,\n    _csrf\n  });\n  return false;\n};\n\nmodule.exports = {\n  PremiumWindow\n};\n\n//# sourceURL=webpack://chattr/./client/app/premium.jsx?");

/***/ }),

/***/ "./client/app/quote.jsx":
/*!******************************!*\
  !*** ./client/app/quote.jsx ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ../helper.js */ \"./client/helper.js\");\n\nconst LocationQuoteWindow = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"lqForm\",\n    onSubmit: handleLocationQuote,\n    name: \"lqForm\",\n    action: \"/addLocationQuote\",\n    method: \"POST\",\n    className: \"lqForm\"\n  }, /*#__PURE__*/React.createElement(\"h1\", null, \"Add a Location-based Quote:\"), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"quoteCopy\"\n  }, \"Quote: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"quoteCopy\",\n    type: \"text\",\n    name: \"quoteCopy\",\n    placeholder: \"What'd you hear?\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"submitQuote\",\n    type: \"submit\",\n    value: \"Submit Quote\"\n  }));\n};\n\nconst handleLocationQuote = async e => {\n  e.preventDefault();\n  helper.hideError();\n  const quoteCopy = e.target.querySelector('#quoteCopy').value;\n  const _csrf = e.target.querySelector(\"#_csrf\").value;\n\n  if (!quoteCopy) {\n    helper.handleError(\"You didn't enter a quote!\");\n    return false;\n  }\n\n  await helper.sendPost(e.target.action, {\n    quoteCopy,\n    _csrf\n  }); // loadLocationQuotesFromServer(_csrf);\n\n  return false;\n};\n\nmodule.exports = {\n  LocationQuoteWindow\n};\n\n//# sourceURL=webpack://chattr/./client/app/quote.jsx?");

/***/ }),

/***/ "./client/helper.js":
/*!**************************!*\
  !*** ./client/helper.js ***!
  \**************************/
/***/ ((module) => {

eval("/* Takes in an error message. Sets the error message up in html, and\r\n   displays it to the user. Will be hidden by other events that could\r\n   end in an error.\r\n*/\nconst handleError = message => {\n  document.getElementById('errorText').textContent = message;\n  document.getElementById('errorMessage').classList.remove('hidden');\n};\n/* Sends post requests to the server using fetch. Will look for various\r\n   entries in the response JSON object, and will handle them appropriately.\r\n*/\n\n\nconst sendPost = async (url, data, handler) => {\n  const response = await fetch(url, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  document.getElementById('errorMessage').classList.add('hidden');\n\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n\n  if (result.error) {\n    handleError(result.error);\n  }\n\n  if (handler) {\n    handler(result);\n  }\n};\n\nconst hideError = () => {\n  document.getElementById('errorMessage').classList.add('hidden');\n};\n\nmodule.exports = {\n  handleError,\n  sendPost,\n  hideError\n};\n\n//# sourceURL=webpack://chattr/./client/helper.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/app.jsx");
/******/ 	
/******/ })()
;