import React from "react";
import ReactDOM from "react-dom";

import reportWebVitals from "./reportWebVitals";
import "./styles/app.css";
import Routes from "./routes";

import Item from "../../components/Item";
import api from "../../services/api";

console.log("1 ");
ReactDOM.render(<Routes />, document.getElementById("root"));
console.log("2 ");
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.timeLog());


var pesquisa = '';
var nivel = '';
var tabela = 'Todos'
var revisao = 'true'
var user_search = 'http://193.136.189.87:5003/search'+'?pesquisa='+pesquisa+'&nivel='+nivel+'&tabela='+tabela+'&revisao='+revisao;

console.log(user_search);

async componentDidMount() {
    // GET request using fetch with async/await
    //const response = await fetch(user_search);
    const data = await response.json();
    this.setState({ totalReactPackages: data.total })
}

console.log(data);
