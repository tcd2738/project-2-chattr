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

eval("const {\n  QuoteMakerWindow,\n  QuoteContainer\n} = __webpack_require__(/*! ./app/quote.jsx */ \"./client/app/quote.jsx\");\n\nconst {\n  PremiumWindow\n} = __webpack_require__(/*! ./app/premium.jsx */ \"./client/app/premium.jsx\");\n\nconst helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\"); // Initializes all necessary components for main app interface.\n\n\nconst init = async () => {\n  // Get security data up front.\n  const response = await fetch('/getToken');\n  const data = await response.json();\n  const _csrf = data.csrfToken; // Find necessary elements and add click handlers.\n\n  const premiumButton = document.getElementById('premiumButton');\n  const ownerQuoteButton = document.getElementById('ownerQuoteButton');\n  premiumButton.addEventListener('click', e => {\n    e.preventDefault();\n    ReactDOM.render( /*#__PURE__*/React.createElement(PremiumWindow, {\n      csrf: _csrf\n    }), document.getElementById('content'));\n    ReactDOM.render('', document.getElementById('content2'));\n    return false;\n  });\n  ownerQuoteButton.addEventListener('click', e => {\n    e.preventDefault(); // ReactDOM.render(<UserQuoteContainer csrf={_csrf} user={session.account.username} />,\n    // document.getElementById('content'));\n\n    ReactDOM.render('', document.getElementById('content2'));\n    return false;\n  }); // Check for location and render starting components if successful.\n  // NOTE: I know setTimeout() is a frowned upon way to code asyncronously,\n  // however I spent multiple hours trying to get the navigator object to work\n  // correcty with either async/await or promises to no avail. This is the\n  // workaround that works best.\n\n  let location;\n  await navigator.geolocation.getCurrentPosition(position => {\n    const lResult = {\n      latitude: position.coords.latitude,\n      longitude: position.coords.longitude\n    };\n    location = lResult;\n  });\n  setTimeout(async () => {\n    if (location !== undefined) {\n      const qResponse = await fetch('/getQuotes?longitude=' + location.longitude + '&latitude=' + location.latitude, {\n        method: 'GET',\n        headers: {\n          'Accept': 'application/json'\n        }\n      });\n      const qDocs = await qResponse.json();\n      ReactDOM.render( /*#__PURE__*/React.createElement(QuoteContainer, {\n        quotes: qDocs.quotes,\n        location: location,\n        csrf: _csrf\n      }), document.getElementById('content'));\n    } else {\n      helper.handleError(\"Unable to access your location!\");\n      return false;\n    }\n  }, 2000);\n  ReactDOM.render( /*#__PURE__*/React.createElement(QuoteMakerWindow, {\n    csrf: _csrf\n  }), document.getElementById('content2'));\n};\n\nwindow.onload = init;\n\n//# sourceURL=webpack://chattr/./client/app.jsx?");

/***/ }),

/***/ "./client/app/premium.jsx":
/*!********************************!*\
  !*** ./client/app/premium.jsx ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const helper = __webpack_require__(/*! ../helper.js */ \"./client/helper.js\"); // Window that displays form for changing a user's premium status.\n\n\nconst PremiumWindow = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"PremiumForm\",\n    name: \"PremiumForm\",\n    onSubmit: handlePremium,\n    action: \"/setPremium\",\n    method: \"POST\",\n    className: \"mainForm\"\n  }, /*#__PURE__*/React.createElement(\"h2\", null, \"Change Your Premium Status?\"), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"username\"\n  }, \"Username: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"user\",\n    type: \"text\",\n    name: \"username\",\n    placeholder: \"username\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"pass\"\n  }, \"Password: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"pass\",\n    type: \"password\",\n    name: \"pass\",\n    placeholder: \"password\"\n  }), /*#__PURE__*/React.createElement(\"div\", {\n    id: \"premiumChoice\"\n  }, /*#__PURE__*/React.createElement(\"input\", {\n    type: \"radio\",\n    id: \"premiumY\",\n    name: \"premiumChoice\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"premiumY\"\n  }, \"Enroll in premium.\"), /*#__PURE__*/React.createElement(\"br\", null), /*#__PURE__*/React.createElement(\"input\", {\n    type: \"radio\",\n    id: \"premiumN\",\n    name: \"premiumChoice\",\n    value: \"false\"\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"premiumN\"\n  }, \"Unenroll in premium.\"), /*#__PURE__*/React.createElement(\"br\", null)), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"formSubmit\",\n    type: \"submit\",\n    value: \"Change Premium Status\"\n  }));\n}; // Change user's premium status based on premium form.\n\n\nconst handlePremium = e => {\n  e.preventDefault();\n  helper.hideError();\n  const username = e.target.querySelector('#user').value;\n  const pass = e.target.querySelector('#pass').value;\n  const _csrf = e.target.querySelector('#_csrf').value; // Search through premium form radio buttons to find selected value.\n\n  const premiumField = document.getElementsByName('premiumChoice');\n  let premium;\n\n  for (let p of premiumField) {\n    if (p.checked) {\n      premium = p.value;\n    }\n  }\n\n  if (!username || !pass || premium === null) {\n    helper.handleError('All fields are required!');\n    return false;\n  }\n\n  helper.sendRequest('PUT', e.target.action, {\n    username,\n    pass,\n    premium,\n    _csrf\n  });\n  return false;\n};\n\nmodule.exports = {\n  PremiumWindow\n};\n\n//# sourceURL=webpack://chattr/./client/app/premium.jsx?");

/***/ }),

/***/ "./client/app/quote.jsx":
/*!******************************!*\
  !*** ./client/app/quote.jsx ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  useState,\n  useEffect\n} = React;\n\nconst helper = __webpack_require__(/*! ../helper.js */ \"./client/helper.js\"); // Window that displays form for adding public (location-based) quotes.\n\n\nconst QuoteMakerWindow = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"lqForm\",\n    onSubmit: handleQuoteMaker,\n    name: \"lqForm\",\n    action: \"/addQuote\",\n    method: \"POST\",\n    className: \"lqForm\"\n  }, /*#__PURE__*/React.createElement(\"h1\", null, \"Add a Location-based Quote:\"), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"quoteCopy\"\n  }, \"Quote: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"quoteCopy\",\n    type: \"text\",\n    name: \"quoteCopy\",\n    placeholder: \"What'd you hear?\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"submitQuote\",\n    type: \"submit\",\n    value: \"Submit Quote\"\n  }));\n}; // Add quote to MongoDB based off of location quote form.\n\n\nconst handleQuoteMaker = async e => {\n  e.preventDefault();\n  helper.hideError();\n  const quoteCopy = e.target.querySelector('#quoteCopy').value;\n  const _csrf = e.target.querySelector(\"#_csrf\").value;\n\n  if (!quoteCopy) {\n    helper.handleError(\"You didn't enter a quote!\");\n    return false;\n  } // Check for location and send quote if successful.\n  // NOTE: I know setTimeout() is a frowned upon way to code asyncronously,\n  // however I spent multiple hours trying to get the navigator object to work\n  // correcty with either async/await or promises to no avail. This is the\n  // workaround that works best.\n\n\n  let location;\n  await navigator.geolocation.getCurrentPosition(position => {\n    const lResult = {\n      latitude: position.coords.latitude,\n      longitude: position.coords.longitude\n    };\n    location = lResult;\n  });\n  setTimeout(() => {\n    if (location !== undefined) {\n      helper.sendRequest('POST', '/addQuote', {\n        quoteCopy,\n        location,\n        _csrf\n      });\n      return false;\n    } else {\n      helper.handleError(\"Unable to access your location!\");\n      return false;\n    }\n  }, 5000);\n}; // Container that displays quotes from 1km radius.\n\n\nconst QuoteContainer = props => {\n  const [quotes, fillJar] = useState(props.quotes);\n  const [location, findLocation] = useState(props.location);\n  useEffect(async () => {\n    setTimeout(async () => {\n      // Check for location and run question search if successful.\n      // NOTE: I know setTimeout() is a frowned upon way to code asyncronously,\n      // however I spent multiple hours trying to get the navigator object to work\n      // correcty with either async/await or promises to no avail. This is the\n      // workaround that works best.\n      let lResponse;\n      await navigator.geolocation.getCurrentPosition(position => {\n        const lResult = {\n          latitude: position.coords.latitude,\n          longitude: position.coords.longitude\n        };\n        lResponse = lResult;\n      });\n      setTimeout(async () => {\n        if (lResponse !== undefined) {\n          helper.hideError();\n          const qResponse = await fetch('/getQuotes?longitude=' + lResponse.longitude + '&latitude=' + lResponse.latitude, {\n            method: 'GET',\n            headers: {\n              'Accept': 'application/json'\n            }\n          });\n          const qDocs = await qResponse.json();\n          const quotes = qDocs.quotes;\n          fillJar(quotes);\n          findLocation(lResponse);\n        } else {\n          helper.handleError(\"Unable to access your location!\");\n        }\n      }, 5000);\n    }, 5000);\n  });\n\n  if (quotes.length === 0 || !quotes) {\n    return /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"h3\", null, \"No quotes here!\"));\n  } // Map and display quotes if quotes are found.\n\n\n  const quoteList = quotes.map(quote => {\n    console.log(quote);\n    return /*#__PURE__*/React.createElement(\"div\", {\n      key: quote._id\n    }, /*#__PURE__*/React.createElement(\"h2\", null, quote.quoteCopy, \" - overheard by \", /*#__PURE__*/React.createElement(\"i\", null, quote.owner)), /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"h3\", null, \"Total Votes: \", quote.votes), /*#__PURE__*/React.createElement(\"button\", {\n      onClick: () => handleVote(true, quote, _csrf)\n    }, \"Upvote\"), /*#__PURE__*/React.createElement(\"button\", {\n      onClick: () => handleVote(false, quote, _csrf)\n    }, \"Downvote\")));\n  });\n  return /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"h1\", null, \"Quotes in Your Area\"), quoteList);\n};\n\nconst handleVote = async (voteValue, quote, _csrfObject) => {\n  const quoteID = quote._id;\n  const _csrf = _csrfObject.value;\n  helper.sendRequest('PUT', '/addVote', {\n    quoteID,\n    voteValue,\n    _csrf\n  });\n};\n\nmodule.exports = {\n  QuoteMakerWindow,\n  QuoteContainer\n};\n\n//# sourceURL=webpack://chattr/./client/app/quote.jsx?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/app.jsx");
/******/ 	
/******/ })()
;