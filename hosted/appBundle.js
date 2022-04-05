(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("domoMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,a,o)=>{const r=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),m=await r.json();document.getElementById("domoMessage").classList.add("hidden"),m.redirect&&(window.location=m.redirect),m.error&&t(m.error),o&&o(m)},hideError:()=>{document.getElementById("domoMessage").classList.add("hidden")}}}},t={};function a(o){var r=t[o];if(void 0!==r)return r.exports;var m=t[o]={exports:{}};return e[o](m,m.exports,a),m.exports}(()=>{const e=a(603),t=e=>React.createElement("form",{id:"domoForm",onSubmit:m,name:"domoForm",action:"/maker",method:"POST",className:"domoForm"},React.createElement("label",{htmlFor:"name"},"Name: "),React.createElement("input",{id:"domoName",type:"text",name:"name",placeholder:"Domo Name"}),React.createElement("label",{htmlFor:"age"},"Age: "),React.createElement("input",{id:"domoAge",type:"number",min:"0",name:"age"}),React.createElement("label",{htmlFor:"powerLvl"},"Power Level: "),React.createElement("input",{id:"domoPowerLvl",type:"number",min:"0",name:"powerLvl"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"makeDomoSubmit",type:"submit",value:"Make Domo"})),o=e=>{if(0===e.domos.length)return React.createElement("div",{className:"domoList"},React.createElement("h3",{className:"emptyDomo"},"No Domos Yet!"));const t=e.domos.map((t=>React.createElement("div",{key:t._id,className:"domo"},React.createElement("div",{className:"domoTitle"},React.createElement("img",{src:"/assets/img/domoface.jpeg",alt:"domo face",className:"domoFace"}),React.createElement("h3",{className:"domoName"},t.name," ")),React.createElement("h3",{className:"domoAge"},"Age: ",t.age," "),React.createElement("h3",{className:"domoPowerLvl"},"Power Level: ",t.powerLvl),React.createElement("button",{className:"deleteDomoButton",onClick:a=>c(t.name,e.csrf)},"Delete Domo"))));return React.createElement("div",{className:"domoList"},t)},r=async e=>{const t=await fetch("/getDomos"),a=await t.json();ReactDOM.render(React.createElement(o,{domos:a.domos,csrf:e}),document.getElementById("domos"))},m=async t=>{t.preventDefault(),e.hideError();const a=t.target.querySelector("#domoName").value,o=t.target.querySelector("#domoAge").value,m=t.target.querySelector("#domoPowerLvl").value,c=t.target.querySelector("#_csrf").value;return a&&o&&m?(await e.sendPost(t.target.action,{name:a,age:o,powerLvl:m,_csrf:c}),r(c),!1):(e.handleError("All fields are required!"),!1)},c=async(t,a)=>(e.hideError(),await e.sendPost("/deleteDomo",{name:t,_csrf:a}),r(a),!1);window.onload=async()=>{const e=await fetch("/getToken"),a=await e.json();ReactDOM.render(React.createElement(t,{csrf:a.csrfToken}),document.getElementById("makeDomo")),ReactDOM.render(React.createElement(o,{csrf:a.csrfToken,domos:[]}),document.getElementById("domos")),r(a.csrfToken)}})()})();