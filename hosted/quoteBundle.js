(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorText").textContent=e,document.getElementById("errorMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,r,o)=>{const a=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),n=await a.json();document.getElementById("errorMessage").classList.add("hidden"),n.redirect&&(window.location=n.redirect),n.error&&t(n.error),o&&o(n)},hideError:()=>{document.getElementById("errorMessage").classList.add("hidden")}}}},t={};function r(o){var a=t[o];if(void 0!==a)return a.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,r),n.exports}(()=>{const e=r(603),t=e=>React.createElement("form",{id:"lqForm",onSubmit:o,name:"lqForm",action:"/addLocationQuote",method:"POST",className:"lqForm"},React.createElement("label",{htmlFor:"quoteCopy"},"Quote: "),React.createElement("input",{id:"quoteCopy",type:"text",name:"quoteCopy",placeholder:"What'd you hear?"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"submitQuote",type:"submit",value:"Submit Quote"})),o=async t=>{t.preventDefault(),e.hideError();const r=t.target.querySelector("#quoteCopy").value,o=t.target.querySelector("#_csrf").value;return r?(await e.sendPost(t.target.action,{quoteCopy:r,_csrf:o}),!1):(e.handleError("You didn't enter a quote!"),!1)};window.onload=async()=>{const e=await fetch("/getToken"),r=await e.json();ReactDOM.render(React.createElement(t,{csrf:r.csrfToken}),document.getElementById("locationJarQuote"))}})()})();