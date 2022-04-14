(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorText").textContent=e,document.getElementById("errorMessage").classList.remove("hidden")};e.exports={handleError:t,sendRequest:async(e,a,r,s)=>{const n=await fetch(a,{method:e,headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),o=await n.json();document.getElementById("errorMessage").classList.add("hidden"),o.redirect&&(window.location=o.redirect),o.error&&t(o.error),s&&s(o)},hideError:()=>{document.getElementById("errorMessage").classList.add("hidden")},getLocation:async()=>navigator.geolocation.getCurrentPosition((e=>({latitude:e.coords.latitude,longitude:e.coords.longitude})))}}},t={};function a(r){var s=t[r];if(void 0!==s)return s.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,a),n.exports}(()=>{const e=a(603),t=e=>React.createElement("form",{id:"loginForm",name:"loginForm",onSubmit:n,action:"/login",method:"POST",className:"mainForm"},React.createElement("label",{htmlFor:"username"},"Username: "),React.createElement("input",{id:"user",type:"text",name:"username",placeholder:"username"}),React.createElement("label",{htmlFor:"pass"},"Password: "),React.createElement("input",{id:"pass",type:"password",name:"pass",placeholder:"password"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Sign In"})),r=e=>React.createElement("form",{id:"signupForm",name:"signupForm",onSubmit:o,action:"/signup",method:"POST",className:"mainForm"},React.createElement("label",{htmlFor:"username"},"Username: "),React.createElement("input",{id:"user",type:"text",name:"username",placeholder:"username"}),React.createElement("label",{htmlFor:"pass"},"Password: "),React.createElement("input",{id:"pass",type:"password",name:"pass",placeholder:"password"}),React.createElement("label",{htmlFor:"pass2"},"Password: "),React.createElement("input",{id:"pass2",type:"password",name:"pass2",placeholder:"retype password"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Sign Up"})),s=e=>React.createElement("form",{id:"changePasswordForm",name:"changePasswordForm",onSubmit:c,action:"/changePassword",method:"POST",className:"mainForm"},React.createElement("label",{htmlFor:"username"},"Username: "),React.createElement("input",{id:"user",type:"text",name:"username",placeholder:"username"}),React.createElement("label",{htmlFor:"oldPass"},"Old Password: "),React.createElement("input",{id:"oldPass",type:"password",name:"oldPass",placeholder:"old password"}),React.createElement("label",{htmlFor:"newPass"},"New Password: "),React.createElement("input",{id:"newPass",type:"password",name:"newPass",placeholder:"new password"}),React.createElement("label",{htmlFor:"newPass2"},"New Password: "),React.createElement("input",{id:"newPass2",type:"password",name:"newPass2",placeholder:"retype new password"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"formSubmit",type:"submit",value:"Change Password"})),n=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#user").value,r=t.target.querySelector("#pass").value,s=t.target.querySelector("#_csrf").value;return a&&r?(e.sendRequest("POST",t.target.action,{username:a,pass:r,_csrf:s}),!1):(e.handleError("Username or password is empty!"),!1)},o=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#user").value,r=t.target.querySelector("#pass").value,s=t.target.querySelector("#pass2").value,n=t.target.querySelector("#_csrf").value;return a&&r&&s?r!=s?(e.handleError("Passwords do not match!"),!1):(e.sendRequest("POST",t.target.action,{username:a,pass:r,pass2:s,_csrf:n}),!1):(e.handleError("All fields are required!"),!1)},c=t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#user").value,r=t.target.querySelector("#oldPass").value,s=t.target.querySelector("#newPass").value,n=t.target.querySelector("#newPass2").value,o=t.target.querySelector("#_csrf").value;return a&&r&&s&&n?s!=n?(e.handleError("New passwords do not match!"),!1):(e.sendRequest("POST",t.target.action,{username:a,oldPass:r,newPass:s,newPass2:n,_csrf:o}),!1):(e.handleError("All fields are required!"),!1)};window.onload=async()=>{const e=await fetch("/getToken"),a=await e.json(),n=document.getElementById("loginButton"),o=document.getElementById("signupButton"),c=document.getElementById("changePasswordButton");n.addEventListener("click",(e=>(e.preventDefault(),ReactDOM.render(React.createElement(t,{csrf:a.csrfToken}),document.getElementById("content")),!1))),o.addEventListener("click",(e=>(e.preventDefault(),ReactDOM.render(React.createElement(r,{csrf:a.csrfToken}),document.getElementById("content")),!1))),c.addEventListener("click",(e=>(e.preventDefault(),ReactDOM.render(React.createElement(s,{csrf:a.csrfToken}),document.getElementById("content")),!1))),ReactDOM.render(React.createElement(t,{csrf:a.csrfToken}),document.getElementById("content"))}})()})();