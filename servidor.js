const http = require("http");
const express = require("express");
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }));

var server = http.createServer(app);
server.listen(8080);
console.log("acesse pela porta 8080");
var apianalise = require(__dirname + "/apianalise");

app.use('/estatico', express.static(__dirname + '/estatico'));
app.get("/", function(req, res) {
    res.sendFile(__dirname +'/index.html');
});


app.post("/api-analise", function(req, res) {
    var envio = apianalise(req);
    envio.then(resultado => {
        res.send(resultado);
    })
});