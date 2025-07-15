const express = require("express");
const router = express.Router();
const Especialidade = require("../model/especialidade");
const Tabela = require("../model/table");

//
console.log("Start Especialidades List ");

//Visualizando Todos os itens da Tabela Especialidades
router.get("/lists/especialidades/", async (req, res) => {
  try {
    // Monta filtro base
    let filter = {};
    // Se o parâmetro Status_Uniclass existe e é "Old", exclui esses resultados
    if (req.query.Status_Uniclass === "Old") {
      filter.Status_Uniclass = { $ne: "Old" };
    }
    //Indica o nome do Collection
    const data = await Especialidade.find(filter, null, { sort: { "_id": 1 } });
    res.json({ error: false, data });
    console.log("Lista de Especialidades");
  } catch (err) {
    console.log("Error DB");
    res.json({ error: true, message: err.message });
  }
});

//Visualizando Todos os itens da Tabela Tabelas
router.get("/lists/tabelas/", async (req, res) => {
  try {
    // Monta filtro base
    let filter = { "code_tabela": { "$ne": null } };
    // Se o parâmetro Status_Uniclass existe e é "Old", exclui esses resultados
    if (req.query.Status_Uniclass === "Old") {
      filter.Status_Uniclass = { $ne: "Old" };
    }
    //Indica o nome do Collection
    const data = await Tabela.find(filter, null, { sort: { "_id": 1 } });
    res.json({ error: false, data });
    console.log("Lista de Tabelas");
  } catch (err) {
    console.log("Error DB");
    res.json({ error: true, message: err.message });
  }
});

module.exports = router;
