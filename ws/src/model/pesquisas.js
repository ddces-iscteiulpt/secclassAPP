const mongoose = require("mongoose");

const PesquisasSchema = new mongoose.Schema({
  users_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  pesquisa_txt: {
    type: String,
    required: true,
  },
  results: {
    type: Array,
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

// Função para usar collection diretamente
const PesquisasModel = mongoose.model("pesquisas", PesquisasSchema);

// Adicionar métodos estáticos para usar driver nativo quando necessário
PesquisasModel.createDirect = async function(data) {
  try {
    const db = mongoose.connection.db;
    const pesquisasCollection = db.collection('pesquisas');
    
    // Adicionar timestamp se não existir
    if (!data.timestamp) {
      data.timestamp = new Date();
    }
    
    const result = await pesquisasCollection.insertOne(data);
    console.log(`Pesquisa inserida diretamente com ID: ${result.insertedId}`);
    return result;
  } catch (err) {
    console.error('Erro ao inserir pesquisa diretamente:', err);
    throw err;
  }
};

PesquisasModel.findDirect = async function(query, options = {}) {
  try {
    const db = mongoose.connection.db;
    const pesquisasCollection = db.collection('pesquisas');
    
    const cursor = pesquisasCollection.find(query, options);
    return await cursor.toArray();
  } catch (err) {
    console.error('Erro ao buscar pesquisas diretamente:', err);
    throw err;
  }
};

module.exports = PesquisasModel;
