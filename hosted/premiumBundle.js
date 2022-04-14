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

/***/ "./client/app/premium.jsx":
/*!********************************!*\
  !*** ./client/app/premium.jsx ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ../helper.js */ \"./client/helper.js\"); // Window that displays form for changing a user's premium status.\n\n\nconst PremiumWindow = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"PremiumForm\",\n    name: \"PremiumForm\",\n    onSubmit: handlePremium,\n    action: \"/setPremium\",\n    method: \"POST\",\n    className: \"mainForm\"\n  }, /*#__PURE__*/React.createElement(\"h2\", null, \"Change Your Premium Status?\"), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"username\"\n  }, \"Username: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"user\",\n    type: \"text\",\n    name: \"username\",\n    placeholder: \"username\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"pass\"\n  }, \"Password: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"pass\",\n    type: \"password\",\n    name: \"pass\",\n    placeholder: \"password\"\n  }), /*#__PURE__*/React.createElement(\"div\", {\n    id: \"premiumChoice\"\n  }, /*#__PURE__*/React.createElement(\"input\", {\n    type: \"radio\",\n    id: \"premiumY\",\n    name: \"premiumChoice\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"premiumY\"\n  }, \"Enroll in premium.\"), /*#__PURE__*/React.createElement(\"br\", null), /*#__PURE__*/React.createElement(\"input\", {\n    type: \"radio\",\n    id: \"premiumN\",\n    name: \"premiumChoice\",\n    value: \"false\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"premiumN\"\n  }, \"Unenroll in premium.\"), /*#__PURE__*/React.createElement(\"br\", null)), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"formSubmit\",\n    type: \"submit\",\n    value: \"Change Premium Status\"\n  }));\n}; // Change user's premium status based on premium form.\n\n\nconst handlePremium = e => {\n  e.preventDefault();\n  helper.hideError();\n  const username = e.target.querySelector('#user').value;\n  const pass = e.target.querySelector('#pass').value;\n  const _csrf = e.target.querySelector('#_csrf').value; // Search through premium form radio buttons to find selected value.\n\n  const premiumField = document.getElementsByName('premiumChoice');\n  let premium;\n\n  for (let p of premiumField) {\n    if (p.checked) {\n      premium = p.value;\n    }\n  }\n\n  if (!username || !pass || premium === null) {\n    helper.handleError('All fields are required!');\n    return false;\n  }\n\n  helper.sendRequest('PUT', e.target.action, {\n    username,\n    pass,\n    premium,\n    _csrf\n  });\n  return false;\n};\n\nmodule.exports = {\n  PremiumWindow\n};\n\n//# sourceURL=webpack://chattr/./client/app/premium.jsx?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client/app/premium.jsx");
/******/ 	
/******/ })()
;