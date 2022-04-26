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

eval("const {\n  QuoteMakerWindow,\n  QuoteContainer,\n  OwnerQuoteContainer\n} = __webpack_require__(/*! ./app/quote.jsx */ \"./client/app/quote.jsx\");\n\nconst helper = __webpack_require__(/*! ./helper.js */ \"./client/helper.js\"); // Initializes all necessary components for main app interface.\n\n\nconst init = async () => {\n  // Get security data up front.\n  const response = await fetch('/getToken');\n  const data = await response.json();\n  const _csrf = data.csrfToken; // Find necessary elements and add click handlers.\n\n  const appButton = document.getElementById('mainAppButton');\n  const ownerQuoteButton = document.getElementById('ownerQuoteButton');\n  appButton.addEventListener('click', e => {\n    e.preventDefault();\n    mainPageLoad(_csrf, e);\n    return false;\n  });\n  ownerQuoteButton.addEventListener('click', async e => {\n    e.preventDefault();\n    const qResponse = await fetch('/getOwnerQuotes', {\n      method: 'GET',\n      headers: {\n        'Accept': 'application/json'\n      }\n    });\n    const qDocs = await qResponse.json();\n    const quotes = qDocs.quotes;\n    ReactDOM.render( /*#__PURE__*/React.createElement(OwnerQuoteContainer, {\n      csrf: _csrf,\n      quotes: quotes\n    }), document.getElementById('content'));\n    ReactDOM.render('', document.getElementById('content2'));\n    return false;\n  });\n  mainPageLoad(_csrf);\n}; // Loads the main page and all necessary requirements.\n\n\nconst mainPageLoad = async _csrf => {\n  await navigator.geolocation.getCurrentPosition(async position => {\n    const lResponse = {\n      latitude: position.coords.latitude,\n      longitude: position.coords.longitude\n    };\n\n    if (lResponse !== undefined) {\n      const qResponse = await fetch('/getQuotes?longitude=' + lResponse.longitude + '&latitude=' + lResponse.latitude, {\n        method: 'GET',\n        headers: {\n          'Accept': 'application/json'\n        }\n      });\n      const qDocs = await qResponse.json();\n      ReactDOM.render( /*#__PURE__*/React.createElement(QuoteContainer, {\n        quotes: qDocs.quotes,\n        csrf: _csrf\n      }), document.getElementById('content'));\n    } else {\n      helper.handleLocationError(\"Unable to access your location!\");\n    }\n  }); // Render quote maker window even if location check fails.\n\n  ReactDOM.render( /*#__PURE__*/React.createElement(QuoteMakerWindow, {\n    csrf: _csrf\n  }), document.getElementById('content2'));\n};\n\nwindow.onload = init;\n\n//# sourceURL=webpack://chattr/./client/app.jsx?");

/***/ }),

/***/ "./client/app/quote.jsx":
/*!******************************!*\
  !*** ./client/app/quote.jsx ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {\n  useState,\n  useEffect\n} = React;\n\nconst helper = __webpack_require__(/*! ../helper.js */ \"./client/helper.js\"); // Window that displays form for adding public (location-based) quotes.\n\n\nconst QuoteMakerWindow = props => {\n  return /*#__PURE__*/React.createElement(\"form\", {\n    id: \"lqForm\",\n    onSubmit: handleQuoteMaker,\n    name: \"lqForm\",\n    action: \"/addQuote\",\n    method: \"POST\",\n    className: \"lqForm\"\n  }, /*#__PURE__*/React.createElement(\"h1\", null, \"Add a Location-based Quote:\"), /*#__PURE__*/React.createElement(\"label\", {\n    htmlFor: \"quoteCopy\"\n  }, \"Quote: \"), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"quoteCopy\",\n    type: \"text\",\n    name: \"quoteCopy\",\n    placeholder: \"What'd you hear?\"\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    id: \"_csrf\",\n    type: \"hidden\",\n    name: \"_csrf\",\n    value: props.csrf\n  }), /*#__PURE__*/React.createElement(\"input\", {\n    className: \"submitQuote\",\n    type: \"submit\",\n    value: \"Submit Quote\"\n  }));\n}; // Add quote to MongoDB based off of location quote form.\n\n\nconst handleQuoteMaker = async e => {\n  e.preventDefault();\n  const quoteCopy = e.target.querySelector('#quoteCopy').value;\n  const _csrf = e.target.querySelector(\"#_csrf\").value;\n\n  if (!quoteCopy) {\n    helper.handleError(\"You didn't enter a quote!\");\n    return false;\n  }\n\n  await navigator.geolocation.getCurrentPosition(position => {\n    const location = {\n      latitude: position.coords.latitude,\n      longitude: position.coords.longitude\n    };\n\n    if (location !== undefined) {\n      helper.sendRequest('POST', '/addQuote', {\n        quoteCopy,\n        location,\n        _csrf\n      });\n    } else {\n      helper.handleLocationError(\"Unable to access your location!\");\n    }\n  });\n}; // Container that displays quotes from 1km radius.\n\n\nconst QuoteContainer = props => {\n  const [quotes, fillJar] = useState(props.quotes);\n  useEffect(() => {\n    // Check the location and reload the quotes every 10 seconds.\n    const interval = setInterval(async () => {\n      await navigator.geolocation.getCurrentPosition(async position => {\n        const lResponse = {\n          latitude: position.coords.latitude,\n          longitude: position.coords.longitude\n        };\n\n        if (lResponse !== undefined) {\n          const qResponse = await fetch('/getQuotes?longitude=' + lResponse.longitude + '&latitude=' + lResponse.latitude, {\n            method: 'GET',\n            headers: {\n              'Accept': 'application/json'\n            }\n          });\n          const qDocs = await qResponse.json();\n          const quotes = qDocs.quotes;\n          fillJar(quotes);\n        } else {\n          helper.handleLocationError(\"Unable to access your location!\");\n        }\n      });\n    }, 10000);\n    return () => clearInterval(interval);\n  });\n\n  if (quotes.length === 0 || !quotes) {\n    return /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"h3\", null, \"No quotes here!\"));\n  } // Map and display quotes if quotes are found.\n\n\n  const quoteList = quotes.map(quote => {\n    return /*#__PURE__*/React.createElement(\"div\", {\n      key: quote._id\n    }, /*#__PURE__*/React.createElement(\"h2\", null, quote.quoteCopy, \" - overheard by \", /*#__PURE__*/React.createElement(\"i\", null, quote.owner)), /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"h3\", null, \"Popularity: \", quote.votes), /*#__PURE__*/React.createElement(\"button\", {\n      onClick: () => handleVote(true, quote, _csrf)\n    }, \"Like\"), /*#__PURE__*/React.createElement(\"button\", {\n      onClick: () => handleVote(false, quote, _csrf)\n    }, \"Dislike\")));\n  });\n  return /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"h1\", null, \"Quotes in Your Area\"), quoteList);\n}; // Container that displays quotes from the current users account.\n\n\nconst OwnerQuoteContainer = props => {\n  if (props.quotes.length === 0 || !props.quotes) {\n    return /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"h3\", null, \"You currently have no quotes!\"));\n  } // Map and display quotes if quotes are found.\n\n\n  const quoteList = props.quotes.map(quote => {\n    return /*#__PURE__*/React.createElement(\"div\", {\n      key: quote._id\n    }, /*#__PURE__*/React.createElement(\"h2\", null, quote.quoteCopy, \" - overheard by \", /*#__PURE__*/React.createElement(\"i\", null, quote.owner)), quote.boosted ? /*#__PURE__*/React.createElement(\"h3\", null, \"Quote Boosted\") : /*#__PURE__*/React.createElement(\"button\", {\n      onClick: () => boostQuote(quote, props.csrf)\n    }, \"Boost quote?\"));\n  });\n  return /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"h1\", null, \"Your Quotes\"), quoteList);\n}; // Send request to server to add vote.\n\n\nconst handleVote = async (voteValue, quote, _csrfObject) => {\n  const quoteID = quote._id;\n  const _csrf = _csrfObject.value;\n  helper.sendRequest('PUT', '/addVote', {\n    quoteID,\n    voteValue,\n    _csrf\n  });\n}; // Send request to server to boost quote.\n\n\nconst boostQuote = async (quote, _csrfObject) => {\n  const quoteID = quote._id;\n  const _csrf = _csrfObject;\n  helper.sendRequest('PUT', '/boostQuote', {\n    quoteID,\n    _csrf\n  });\n};\n\nmodule.exports = {\n  QuoteMakerWindow,\n  QuoteContainer,\n  OwnerQuoteContainer\n};\n\n//# sourceURL=webpack://chattr/./client/app/quote.jsx?");

/***/ }),

/***/ "./client/helper.js":
/*!**************************!*\
  !*** ./client/helper.js ***!
  \**************************/
/***/ ((module) => {

eval("// Take in error message, and display it to the user.\nconst handleError = message => {\n  document.getElementById('errorText').textContent = message;\n  document.getElementById('errorMessage').classList.remove('hidden');\n  setTimeout(() => {\n    document.getElementById('errorMessage').classList.add('hidden');\n  }, 8000);\n}; // Location errors get their own seperate field as they refresh quite frequently.\n\n\nconst handleLocationError = message => {\n  document.getElementById('locationErrorText').textContent = message;\n  document.getElementById('locationErrorMessage').classList.remove('hidden');\n  setTimeout(() => {\n    document.getElementById('locationErrorMessage').classList.add('hidden');\n  }, 8000);\n}; // Sends requests with body data to the server. Will handle returns appropriately.\n\n\nconst sendRequest = async (method, url, data, handler) => {\n  const response = await fetch(url, {\n    method: method,\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(data)\n  });\n  const result = await response.json();\n  document.getElementById('errorMessage').classList.add('hidden');\n\n  if (result.redirect) {\n    window.location = result.redirect;\n  }\n\n  if (result.error) {\n    handleError(result.error);\n  }\n\n  if (handler) {\n    handler(result);\n  }\n};\n\nmodule.exports = {\n  handleError,\n  handleLocationError,\n  sendRequest\n};\n\n//# sourceURL=webpack://chattr/./client/helper.js?");

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