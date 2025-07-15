// Carrega as variáveis de ambiente
require('dotenv').config();

// Mongoose é a biblioteca para manipular o Mongodb com javascript
const mongoose = require("mongoose");

// URI vem das variáveis de ambiente
const uri = process.env.MONGODB_URI;
const localhostMongoDB = process.env.LOCALHOST_MONGODB;

// Verificação se a URI foi carregada
if (!uri) {
  console.error('MONGODB_URI não encontrada nas variáveis de ambiente');
  process.exit(1);
}

var DB_backup;

// Opções otimizadas para Mongoose 6+
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

console.log("Connecting DATABASE.........");
mongoose.connect(uri, options).then(
  () => { 
    console.log(".........Cluster0 Connected");
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  },
  err => { 
    DB_backup = 0;
    console.log(`MongoDB err: ${err}`);
  }
);

if (DB_backup == 0){
  console.log(`Tentando conexão backup...`);
  mongoose.connect(localhostMongoDB, options).then(
    () => { console.log("ClusterDB Backup Conectado") },
    err => { console.log(`MongoDB backup err: ${err}`) }
  );
}

module.exports = mongoose;