let test = require("../picwall.html");//CommonJS模块化开发思想
let less = require("../css/picwall.less");

function output(){
   let dom = document.getElementById("app");
   dom.innerHTML= test;
}
output();

