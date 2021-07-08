// Mongoose é a biblioteca para manipular o Mongodb com javascript
//##### Exemplo da blibioteca
//'mongodb://localhost:27017/nome_da_base_de_dados
//mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

const mongoose = require("mongoose");
console.log("Conectando Banco");
mongoose.connect("mongodb://localhost:27017/SECClasS-DB", {
  /*
mongoose.connect(
  "mongodb+srv://root_out:client_top@cluster0.rfblu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
*/
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("BD Conectado");
