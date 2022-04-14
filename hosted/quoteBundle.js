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

/***/ "./client/app/quote.jsx":
/*!******************************!*\
  !*** ./client/app/quote.jsx ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ../helper.js */ \"./client/helper.js\"); // Window that displays form for adding public (location-based) quotes.\n\n\nconst LocationQuoteWindow = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"lqForm\",\n    onSubmit: handleLocationQuote,\n    name: \"lqForm\",\n    action: \"/addLocationQuote\",\n    method: \"POST\",\n    className: \"lqForm\"\n  }, /*#__PURE__*/React.createElement(\"h1\", null, \"Add a Location-based Quote:\"), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"quoteCopy\"\n  }, \"Quote: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"quoteCopy\",\n    type: \"text\",\n    name: \"quoteCopy\",\n    placeholder: \"What'd you hear?\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"submitQuote\",\n    type: \"submit\",\n    value: \"Submit Quote\"\n  }));\n}; // Add quote to MongoDB based off of location quote form.\n\n\nconst handleLocationQuote = async e => {\n  e.preventDefault();\n  helper.hideError();\n  const quoteCopy = e.target.querySelector('#quoteCopy').value;\n  const _csrf = e.target.querySelector(\"#_csrf\").value;\n\n  if (!quoteCopy) {\n    helper.handleError(\"You didn't enter a quote!\");\n    return false;\n  } // Check for location and send quote if successful.\n\n\n  const location = await helper.getLocation();\n\n  if (location !== undefined) {\n    helper.sendPost(e.target.action, {\n      quoteCopy,\n      location,\n      _csrf\n    });\n    return false;\n  } else {\n    helper.handleError(\"Unable to access your location!\");\n    return false;\n  }\n};\n\nmodule.exports = {\n  LocationQuoteWindow\n};\n\n//# sourceURL=webpack://chattr/./client/app/quote.jsx?");

/***/ }),

/***/ "./client/helper.js":
/*!**************************!*\
  !*** ./client/helper.js ***!
  \**************************/
/***/ ((module) => {

eval("// Take in error message, and display it to the user.\nconst handleError = message => {\n  document.getElementById('errorText').textContent = message;\n  document.getElementById('errorMessage').classList.remove('hidden');\n}; // Sends requests with body data to the server. Will handle returns appropriately.\n\n\nconst sendRequest = async (method, url, data, handler) => {\n  const response = await fetch(url, {\n    method: method,\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  document.getElementById('errorMessage').classList.add('hidden');\n\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n\n  if (result.error) {\n    handleError(result.error);\n  }\n\n  if (handler) {\n    handler(result);\n  }\n};\n\nconst hideError = () => {\n  document.getElementById('errorMessage').classList.add('hidden');\n}; // Accesses the browser's navigator object, and pulls location data.\n\n\nconst getLocation = async () => navigator.geolocation.getCurrentPosition(position => {\n  const lResult = {\n    latitude: position.coords.latitude,\n    longitude: position.coords.longitude\n  };\n  return lResult;\n});\n\nmodule.exports = {\n  handleError,\n  sendRequest,\n  hideError,\n  getLocation\n};\n\n//# sourceURL=webpack://chattr/./client/helper.js?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./client/app/quote.jsx");
/******/ 	
/******/ })()
;