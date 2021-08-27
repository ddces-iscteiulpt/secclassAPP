import React, { useState, useEffect } from "react";
import Item from "../../components/Item";
import api from "../../services/api";

var pesquisa = '';
var nivel = '';
var tabela = 'Todos'
var revisao = 'true'
var user_search = 'http://193.136.189.87:5003/search'+'?pesquisa='+pesquisa+'&nivel='+nivel+'&tabela='+tabela+'&revisao='+revisao;

console.log(user_search);

async componentDidMount() {
    // GET request using fetch with async/await
    const response = await fetch(user_search);
    const data = await response.json();
    this.setState({ totalReactPackages: data.total })
}

console.log(data);
