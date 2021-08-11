// Mongoose é a biblioteca para manipular o Mongodb com javascript
//##### Exemplo da blibioteca
//'mongodb://localhost:27017/nome_da_base_de_dados
//mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
const mongoose = require("mongoose");
const uri = "mongodb+srv://root_out:client_top@cluster0.rfblu.mongodb.net/SecClasS?retryWrites=true&w=majority";
const localhostMongoDB = "mongodb://localhost:27017/SECClasS-DB";
console.log(`URI MongoDB: ${uri}`);

var DB_backup;

// opcçoes de segurança e acesso - FUTURO
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
}; //mongoose.connect(uri, options);

var options1 = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

console.log("Conectando Banco");
mongoose.connect(localhostMongoDB, options1).then(
  () => { console.log("LocalhostDB Conectado") /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
  err => { DB_backup = 0, console.log(`MongoDB err: ${err}`)/** handle initial connection error */ }
);

if (DB_backup == 0){
  console.log(`MongoDB err`);
  mongoose.connect(uri, options1).then(
    () => { console.log("ClusterDB Conectado") /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
    err => { console.log(`MongoDB err: ${err}`)/** handle initial connection error */ }
  );
}
