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

/***/ "./client/app/jar.jsx":
/*!****************************!*\
  !*** ./client/app/jar.jsx ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  useState,\n  useEffect\n} = React;\n\nconst helper = __webpack_require__(/*! ../helper.js */ \"./client/helper.js\"); // Window that displays form for creating private jar.\n\n\nconst JarCreationWindow = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"jarForm\",\n    onSubmit: handleJarCreation,\n    name: \"jarForm\",\n    action: \"/makeJar\",\n    method: \"POST\",\n    className: \"jarForm\"\n  }, /*#__PURE__*/React.createElement(\"h1\", null, \"Create a Personal Jar: \"), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"jarName\"\n  }, \"Jar Name: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"jarName\",\n    type: \"text\",\n    name: \"jarName\",\n    placeholder: \"Jar Name\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"makeJar\",\n    type: \"submit\",\n    value: \"Create Jar\"\n  }));\n}; // Container that displays quotes from 1km radius.\n\n\nconst LocationJarContainer = props => {\n  const [quotes, fillJar] = useState(props.quotes);\n  const [location, findLocation] = useState(props.location);\n  useEffect(async () => {\n    setTimeout(async () => {\n      // Check for location and run question search if successful.\n      const lResponse = await helper.getLocation();\n\n      if (lResponse !== undefined) {\n        const qResponse = await fetch('/getLocationQuotes?longitude=' + lResponse.longitude + '&latitude=' + lResponse.latitude, {\n          method: 'GET',\n          headers: {\n            'Accept': 'application/json'\n          }\n        });\n        const qDocs = await qResponse.json();\n        const quotes = qDocs.quotes;\n        fillJar(quotes);\n        findLocation(lResponse);\n        console.log('just checked quotes and location');\n      } else {\n        helper.handleError(\"Unable to access your location!\");\n      }\n    }, 30000);\n  });\n\n  if (quotes.length === 0) {\n    return /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"h3\", null, \"No quotes here!\"));\n  } // Map and display quotes if quotes are found.\n\n\n  const quoteList = quotes.map(quote => {\n    return /*#__PURE__*/React.createElement(\"div\", {\n      key: quote._id\n    }, /*#__PURE__*/React.createElement(\"h2\", null, quote.quoteCopy, \" - overheard by \", /*#__PURE__*/React.createElement(\"i\", null, quote.owner)));\n  });\n  return /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"h1\", null, \"Quotes in Your Area\"), quoteList);\n}; // Create a jar based on jarForm.\n\n\nconst handleJarCreation = async e => {\n  e.preventDefault();\n  helper.hideError();\n  const jarName = e.target.querySelector('#jarName').value;\n  const _csrf = e.target.querySelector(\"#_csrf\").value;\n\n  if (!jarName) {\n    helper.handleError(\"You didn't enter a jar name!\");\n    return false;\n  }\n\n  await helper.sendRequest('POST', e.target.action, {\n    jarName,\n    _csrf\n  });\n  return false;\n};\n\nmodule.exports = {\n  JarCreationWindow,\n  LocationJarContainer\n};\n\n//# sourceURL=webpack://chattr/./client/app/jar.jsx?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/app/jar.jsx");
/******/ 	
/******/ })()
;