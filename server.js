//Install express server
const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();


app.use(cors());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/RiojaCanguro'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/RiojaCanguro/index.html'));
});

async function main() {
    await app.listen(process.env.PORT);
    console.log("Server on port", process.env.PORT);
}

main();