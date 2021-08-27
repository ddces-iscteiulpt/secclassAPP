const database = require("../services/database");
const Item = require("../model/item");

var search ='?';

const update_review = async () => {
  try {
    const data_out = await Item.find({
      "titulo_SECClasS": { "$regex": search, "$options": "i"}
    },
      null,
      {sort: {"_id": 1}},
      function(err){
      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
      {
        res.send(err);
        console.log(`err: ${err}`)
      }
    });//.where('nivel_item').lte(nivel);
    console.log(`Data_out = ${data_out}`);
  } catch (err) {
        console.log(err.message);
      }
};

update_review();
