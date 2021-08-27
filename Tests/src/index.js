import React from "react";
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


export const getapi = () => async dispatch => {
    try {
        const res = await axios.get(`${user_search}${window.location.search}`) // This will add your current page url query params to API url so the API url would be: '/shop?category=music'
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
}
