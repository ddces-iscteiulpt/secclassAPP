import axios from "axios";
console.log("acessando a API");
const api = axios.create({
  //baseURL: "http://localhost:5003/",
  //baseURL: "http://193.136.189.87:5003/",
  baseURL: "http://217.112.93.248:5003/",
  //baseURL: "http://pesquisa.secclass.pt:5003/"
});
console.log("Rodando a API");
export default api;
