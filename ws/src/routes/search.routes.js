const express = require("express");
const router = express.Router();
const Pesquisa = require("../model/pesquisas");
const Item = require("../model/item");
const Tabela = require("../model/table");
const User = require("../model/user");
const mongoose = require("mongoose");

//////////// GET API - PESQUISA
//exemplo => https://server.secclass.pt/search?pesquisa=&tabela=Todos&nivel=4&estado=Obsoleto
router.get("/search/", async (req, res) => {
  try {
    const input_pesquisa = req.query.pesquisa;
    const criterio_tabela = req.query.tabela;
    const criterio_nivel = parseInt(req.query.nivel) || 4; // Default to 4 if NaN
    const param_revisao = req.query.revisao;
    const estado = req.query.estado;
    const page = parseInt(req.query.page) || 1; // Default to 1 if NaN
    const limit = parseInt(req.query.limit) ; // Default to 14672 if NaN
    const user = req.query.user_id;
    console.log(`SearchRoute: '${input_pesquisa}' , '${criterio_tabela}' , '${criterio_nivel}' , '${param_revisao}' , '${estado}' , '${page}' , '${limit}' e '${user}'.`);
    //////////////////////////////////////////////////////////
    let skipIndex;
    let _limit = limit;
    let _page = page;
    skipIndex = (_page - 1) * _limit;
    //////////////////////////////////////////////////////////
    var search;
    if (input_pesquisa === undefined || input_pesquisa == "") {
      //search = '\\' + input_pesquisa;
      search = {
        "$ne": ""
      };
    } else {
      search = {
        "$regex": input_pesquisa,
        "$options": "i"
      };
    }
    //var search_log = JSON.stringify(search);
    //console.log(`Parametro search: ${search}`);
    //////////////////////////////////////////////////////// tentar pesquisa pela tabela_id
    var tabela;
    if (criterio_tabela === undefined || criterio_tabela == "") {
      tabela = {}; // Sem filtro por tabela
    } else if (criterio_tabela === "Todos") {
      tabela = {}; // Sem filtro por tabela
    } else {
      tabela = {
        "code_tabela": criterio_tabela
      };
    }
    //var tabela_log = JSON.stringify(tabela);
    //console.log(`Parametro tabela: ${tabela}`);
    //////////////////////////////////////////////////////////////
    var nivel;
    if (!criterio_nivel || criterio_nivel == 4) {
      nivel = {}; // Sem filtro por nível (todos os níveis)
    } else {
      nivel = {
        "nivel_item": {
          "$lte": criterio_nivel
        }
      };
    }
    //var nivel_log = JSON.stringify(nivel);
    //console.log(`Parametro nivel: ${nivel_log}`);
    /////////////////////////////////////////////////////////////
    var revisao;
    if (param_revisao === undefined || param_revisao == "") {
      revisao = {}; // Sem filtro por revisão
    } else if (param_revisao === "false") {
      revisao = {
        "review": false
      };
    } else if (param_revisao === "true") {
      revisao = {
        "review": true
      };
    }
    //var revisao_log = JSON.stringify(revisao);
    //console.log(`Parametro revião: ${revisao_log}`);
    /////////////////////////////////////////////////////////////////
    var estadoFilter;
    if (estado === undefined || estado == "") {
      estadoFilter = {}; // Sem filtro por estado
    } else if (estado === "Versão Corrente") {
      estadoFilter = {
        "Status_Version": { $in: ["Versão Corrente", "Apenas na Versão Portuguesa"] }
      };
    } else {
      estadoFilter = {
        "Status_Version": estado
      };
    }
    console.log(`Parametro estado:`, JSON.stringify(estadoFilter));
    /////// PARAMETROS DE PESQUISA
    console.log(`Parametro search:`, JSON.stringify(search));
    console.log(`Parametro tabela:`, JSON.stringify(tabela));
    console.log(`Parametro nivel:`, JSON.stringify(nivel));
    console.log(`Parametro revisao:`, JSON.stringify(revisao));
    console.log(`Parametro estado:`, JSON.stringify(estadoFilter));
    
    const pesquisa_total = {
      $and: [
        tabela,
        nivel,
        revisao,
        estadoFilter,
        {
          $or: [
            { "code_item": search },
            { "titulo_SECClasS": search },
            { "title_item": search }
          ]
        }
      ]
    };
    
    console.log(`Query MongoDB:`, JSON.stringify(pesquisa_total, null, 2));
    const select_data = {
      "_id": 1,
      "Versao_Uniclass": 1,
      "versao_secclas": 1,
      "nivel_item": 1,
      "code_item": 1,
      "title_item": 1,
      "titulo_SECClasS": 1,
      "descricao_SECClasS": 1,
      "revit": 1,
      "WBS": 1,
      "code_tabela": 1,
      "especialidade": 1,
      "review": 1,
      "tabela_id": 1,
      "Status_Version": 1
    };
    const order = {
      "_id": 1
    };
    /////////////////////////////////////////////////////////////////
    /*
    const aggregate = Item.aggregate([{
      $group:{
        _id: "$code_item",
        maxvalue: { $max: "idItem" }
      }
    }]);

    console.log("%j",aggregate);
    */
    /////////////////////////////////////////////////////////////////
    let total_item = 0;
    let data = [];
    try {
      // Usar collection diretamente como no database.js
      const db = mongoose.connection.db;
      console.log(`✅ Database conectado: ${db.databaseName}`);
      
      // Listar todas as collections disponíveis
      const collections = await db.listCollections().toArray();
      console.log(`Collections disponíveis:`, collections.map(c => c.name));
      
      const itemsCollection = db.collection('tables_secclass'); // Usar a collection correta!
      
      // Teste direto com dados reais primeiro
      console.log(`🔍 Testando busca direta por documentos...`);
      
      // Teste 1: Buscar todos os documentos (sem filtro)
      const allDocs = await itemsCollection.countDocuments({}, { maxTimeMS: 5000 });
      console.log(`Total de documentos (sem filtro): ${allDocs}`);
      
      // Teste 2: Buscar por code_tabela específico
      const complexosDocs = await itemsCollection.countDocuments({ "code_tabela": "Complexos" }, { maxTimeMS: 5000 });
      console.log(`Documentos com code_tabela='Complexos': ${complexosDocs}`);
      
      // Teste 3: Buscar com nivel_item <= 4
      const nivelDocs = await itemsCollection.countDocuments({ "nivel_item": { $lte: 4 } }, { maxTimeMS: 5000 });
      console.log(`Documentos com nivel_item <= 4: ${nivelDocs}`);
      
      // Teste 4: Buscar um documento específico que sabemos que existe
      const specificDoc = await itemsCollection.findOne({ "code_item": "Co_20_75_42" }, { maxTimeMS: 5000 });
      console.log(`Documento específico Co_20_75_42:`, specificDoc ? "ENCONTRADO" : "NÃO ENCONTRADO");
      
      if (specificDoc) {
        console.log(`Campos do documento:`, {
          code_tabela: specificDoc.code_tabela,
          nivel_item: specificDoc.nivel_item,
          review: specificDoc.review,
          Status_Version: specificDoc.Status_Version
        });
      }
      
      // Debug: verificar se existem documentos com este estado
      if (estado && estado !== "") {
        try {
          const estadoCount = await itemsCollection.countDocuments({ "Status_Version": estado }, { maxTimeMS: 5000 });
          console.log(`Documentos com Status_Version '${estado}':`, estadoCount);
          
          // Listar valores únicos de Status_Version para debug
          const distinctEstados = await itemsCollection.distinct("Status_Version");
          console.log(`Valores únicos de Status_Version na DB:`, distinctEstados);
        } catch (timeoutErr) {
          console.log(`Timeout no debug de estado, continuando...`);
        }
      }
      
      // Debug: verificar se existem documentos com esta tabela (com timeout)
      if (criterio_tabela && criterio_tabela !== "Todos") {
        try {
          const testCount = await itemsCollection.countDocuments({ "code_tabela": criterio_tabela }, { maxTimeMS: 5000 });
          console.log(`Documentos com code_tabela '${criterio_tabela}':`, testCount);
          
          // Listar valores únicos de code_tabela para debug
          const distinctTables = await itemsCollection.distinct("code_tabela");
          console.log(`Valores únicos de code_tabela na DB:`, distinctTables.slice(0, 20));
        } catch (timeoutErr) {
          console.log(`Timeout no debug, continuando...`);
        }
      }
      
      // Simplificar a query se não há pesquisa de texto
      let simplifiedQuery;
      if (!input_pesquisa || input_pesquisa === "") {
        // Construir query apenas com filtros não vazios
        const filters = [];
        if (Object.keys(tabela).length > 0) filters.push(tabela);
        if (Object.keys(nivel).length > 0) filters.push(nivel);
        if (Object.keys(revisao).length > 0) filters.push(revisao);
        if (Object.keys(estadoFilter).length > 0) filters.push(estadoFilter);
        
        simplifiedQuery = filters.length > 0 ? { $and: filters } : {};
      } else {
        simplifiedQuery = pesquisa_total;
      }
      
      console.log(`Using simplified query:`, JSON.stringify(simplifiedQuery, null, 2));
      
      // Usar collection diretamente para countDocuments
      total_item = await itemsCollection.countDocuments(simplifiedQuery, { maxTimeMS: 8000 });
      console.log("Number results:", total_item);
      
      // Usar collection diretamente para find
      const cursor = itemsCollection.find(simplifiedQuery, {
        projection: select_data,
        sort: order,
        limit: _limit,
        skip: skipIndex,
        maxTimeMS: 8000
      });
      
      data = await cursor.toArray();
        
    } catch (err) {
      console.log(`err: ${err}`);
      return res.json({ error: true, message: err.message });
    }
    /////////////////////////////////////////////////////////////////
    //Debug
    var type = typeof data;
    const max_page = Math.ceil(total_item / _limit);

    const limit_Length = Array.isArray(data) ? data.length : 0;
    console.log(`Numeros de docs objectLength = ${limit_Length}`);
    if (limit_Length == 0) {
      console.log("PESQUISA NAO ENCONTRADA");
      //data = ["Termo pesquisado não encontrado."];
      //data = [];
    }

        ///////////////// Guardar o termo pesquisado pelo User na DB
    var results = [];
    for (let i = 0; i < limit_Length; i++) {
      results.push(data[i].code_item);
    }
    //console.log(`Results = ${results}`);

    if (input_pesquisa === undefined || input_pesquisa == "") {

    } else {
      //console.log(`input_pesquisa ${input_pesquisa}`);
      const store = {
        "users_id": user || "61014705970082f592719864", //ID Public User
        "pesquisa_txt": input_pesquisa,
        "results": results,
        //"timestamp": new Date()                 //current date to timestamp
      };
      
      try {
        // Usar o novo método createDirect para melhor performance
        const data_save = await Pesquisa.createDirect(store);
        console.log(`Pesquisa guardada diretamente: ${input_pesquisa} (${results.length} resultados)`);
      } catch (err) {
        console.log(`⚠ Não foi possível guardar a pesquisa diretamente: ${err.message}`);
        // Fallback para método tradicional se falhar
        try {
          const data_save = await Pesquisa.create(store);
          console.log(`Pesquisa guardada com método tradicional: ${input_pesquisa}`);
        } catch (fallbackErr) {
          console.log(`⚠ Fallback também falhou: ${fallbackErr.message}`);
        }
      }
    }
    ///////////////// Guardar o termo pesquisado e resultados pelo User na DB

    //____________////////RES
    res.json({
      error: false,
      total_item,
      limit_Length,
      max_page,
      data
    });
  } catch (err) {
    console.log("Error Pesquisa");
    res.json({
      error: true,
      message: err.message
    });
  }
});
module.exports = router;
