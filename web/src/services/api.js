import axios from "axios";
console.log("acessando a API");
const api = axios.create({
  baseURL: "https://server.secclass.pt",

});
console.log("Rodando a API");
export default api;
