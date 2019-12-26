//Install express server
//Response
require("./backend/Config/");
require("./backend/Config/db");
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");

const api = require("./backend/Routes");

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

app.use(cors());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/RiojaCanguro'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/RiojaCanguro/index.html'));
});
//Configuración Global de rutas

app.use("/api", api);

async function main() {
    await app.listen(process.env.PORT);
    console.log("Server on port", process.env.PORT);
}

main();