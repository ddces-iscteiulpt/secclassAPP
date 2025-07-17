const mongoose = require("mongoose");
const Tabela = require("../model/table");
const Revit = require("../model/revit");

const ItemSchema = new mongoose.Schema({
  idItem: {
    type: Number,
  },
  Autor: {
    type: String,
  },
  Versao_Uniclass: {
    type: String,
  },
  versao_secclass: {
    type: Number,
  },
  code_tabela: {
    type: String,
  },
  tabela_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'table',
  },
  nivel_item: {
      type: Number,
  },
  Group: {
    type: String,
  },
  Subgroup: {
    type: String,
  },
  Section: {
    type: String,
  },
  Object: {
    type: String,
  },
  code_item: {
    type: String,
  },
  title_item: {
    type: String,
  },
  titulo_SECClasS: {
    type: String,
  },
  review: {
    type: Boolean,
  },
  descricao_SECClasS: {
    type: String,
  },
  especialidade: {
    type: String,
  },
  keywords: {
    type: [],
  },
  revit:
  {
    type: String,
  },
  WBS:
  {
    type: mongoose.Schema.Types.Mixed,
  },
    Status_Version:
  {
    type: String,
  }
},
{timestamps: true}
);

module.exports = mongoose.model("Item", ItemSchema);
