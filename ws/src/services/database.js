// Mongoose é a biblioteca para manipular o Mongodb com javascript
//##### Exemplo da blibioteca
const mongoose = require("mongoose");
const uri = "mongodb+srv://sara_doutora_dev:J2eJMvJCsFOR92Uu@tables-db.bph3yso.mongodb.net/SECCLASS_v1-9?retryWrites=true&w=majority&appName=tables-db";

async function connectAndTest() {
  try {
    console.log("Connecting to MongoDB...");
    // Conectar com opções para evitar warnings
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
 
    console.log("✅ Connected to MongoDB Cluster");
 
    // Obter ligação nativa ao driver
    const db = mongoose.connection.db;
    console.log("✅ DB instance ready:", db.databaseName);
 
    // Selecionar coleção - vamos tentar diferentes nomes
    let tablesCollection = db.collection("tables_secclass");
    console.log("✅ Collection 'tables_secclass' selected");
 
    // Testar se existe essa collection
    let docs = await tablesCollection.find({}).limit(2).toArray();
    console.log(`✅ Found ${docs.length} documents in 'tables_secclass'`);
    
    if (docs.length === 0) {
      // Tentar outras collections possíveis
      const collections = await db.listCollections().toArray();
      console.log("Available collections:", collections.map(c => c.name));
      
      // Tentar collection 'items'
      tablesCollection = db.collection("items");
      docs = await tablesCollection.find({}).limit(2).toArray();
      console.log(`✅ Found ${docs.length} documents in 'items'`);
    }
    
    if (docs.length > 0) {
      console.log("Sample documents:");
      console.log(JSON.stringify(docs, null, 2));
    }
 
  } catch (err) {
    console.error("❌ Connection/Test error:", err);
  }
  // Não fechar a ligação - manter conectado para a aplicação
  console.log("� Connection remains open for application use");
}
 
// Executar
connectAndTest();