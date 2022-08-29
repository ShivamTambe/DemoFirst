const express = require ("express");
const path = require ("path");
const ejs = require("ejs");
const app = express();

const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.render("index");
})

app.get("/rewards", function(req, res){
    res.render("rewards");
})

app.get("/company", function(req, res){
    res.render("company");
})
app.get("/pricing", function(req, res){
    res.render("pricing");
})
app.get("/product", function(req, res){
    res.render("product");
})
app.get("/partners", function(req, res){
    res.render("partners");
})
app.get("/resources", function(req, res){
    res.render("resources");
})

app.listen(port, function(){
    console.log("server is running on prot "+ port);
})