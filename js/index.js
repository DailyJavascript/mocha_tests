import CodeMirror from 'codemirror';
import "../node_modules/codemirror/lib/codemirror.css";
import "../node_modules/codemirror/theme/dracula.css";
import "../node_modules/codemirror/mode/javascript/javascript.js";
import expect from 'expect'

window.CodeMirror = CodeMirror;
function getUrlParams() {
  var vars = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function() {
    //the arguments passed in will always be the same
    vars[arguments[1]] = arguments[2];
  });
  return vars;
}

window.getUrlParams = getUrlParams;

function getChallenge() {
  const xhr = new XMLHttpRequest();
  const id = getUrlParams()['id'];
  if (!xhr) {
    return false;
  }

  xhr.open("GET", `http://localhost:3000/challenges/${id}`, true);
  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
     let response = JSON.parse(xhr.response);
     document.getElementById('challenge').innerHTML = response.challenge;
     document.getElementById('testSpecs').innerHTML = `${response.test_assertions}`;
    }
  }
  xhr.send();
}


document.onreadystatechange = function () {
  if (document.readyState === "interactive")  {
    getChallenge();
  }
}