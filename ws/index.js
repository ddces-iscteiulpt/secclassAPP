// import express
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");  /////////////////
const database = require("./src/services/database");

// create new express app and assign it to `app` constant
const app = express();

// server port configuration
const PORT = 5003;
const HTTPS_PORT = 443;

// import packages HTTPS
const fs = require('fs');
const http = require('http');
const https = require('https');

/*
// Certificate
var sslPath = './sllcert/';
const privateKey = fs.readFileSync(sslPath + 'privkey1.pem', 'utf8');
const certificate = fs.readFileSync(sslPath + 'cert1.pem', 'utf8');
const ca = fs.readFileSync(sslPath + 'chain1.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
*/

const usuarioRoutes = require("./src/routes/usuario.routes");
const tabelaRoutes = require("./src/routes/tabela.routes");
const itemRoutes = require("./src/routes/item.routes");
const reviewRoutes = require("./src/routes/review.routes");

const searchRoutes = require("./src/routes/search.routes");
const commentRoutes = require("./src/routes/comment.routes");
const listsRoutes = require("./src/routes/lists.routes");
const hierarchyRoutes = require("./src/routes/hierarchy.routes");

var timestamp = Date.now();
var format_date = new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ')
console.log(`___ Server Power On -> ${format_date} ___`);

//MIDDLEAWARES
app.use(express.json());
//Controle de Acesso
app.use(cors());
//Login automatico para ambiente dev
app.use(morgan("dev"));

//ROUTES
console.log("User Routes");
app.use("/usuario/", usuarioRoutes);

console.log("Tabela Route");
app.use("/", tabelaRoutes);

console.log("Item Routes");
app.use("/", itemRoutes);

console.log("Review Routes");
app.use("/", reviewRoutes);
/////////////////////////////////////////////////////////////////
console.log("Search Routes");
app.use("/", searchRoutes);

console.log("Comentarios Routes");
app.use("/", commentRoutes);

console.log("Lists Routes");
app.use("/", listsRoutes);

console.log("Family Routes");
app.use("/", hierarchyRoutes);

//addRevit();

/*
// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// server starts listening the `PORT`
httpServer.listen(PORT, () => {
	console.log(`.......HTTP Server is running at PORT ${PORT}`);
});

httpsServer.listen(HTTPS_PORT, () => {
	console.log(`.......HTTPS Server is running at PORT ${HTTPS_PORT}`);
});
*/

//START PORT Server
app.listen(PORT, () => {
  console.log(`.......HTTP Server is running at PORT ${PORT}`);
});
