const express = require ("express");
const path = require ("path");
const ejs = require("ejs");
const app = express();
const bodyparser = require('body-parser');

const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended:false}))


app.get("/", function(req, res){
    res.render("login");
})
app.get("/signup", function(req, res){
    res.render("signup");
})

app.get("/rewards", function(req, res){
    res.render("rewards");
})
app.get("/index", function(req, res){
    res.render("index");
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
app.get("/startbusiness", function(req, res){
    res.render("startbusiness");
})
app.get("/llc", function(req, res){
    res.render("llc");
})
app.get("/home", function(req, res){
    res.render("index");
})
app.get("/llc-last",function(req, res){
    res.render("llc-last");
})
app.get("/don'tknow",function(req, res){
    res.render("don'tknow");
})
app.get("/login",function(req, res){
    res.render("login");
})

app.post("/next",function(req, res){
    console.log(req.body.radio);
    let value = req.body.radio;

    if(value == 1 ){
        console.log("value is 1");
        res.render("llc");
    }
    if(value == 2 ){
        console.log("value is 2");
        res.render("llc");
    }
    if(value == 3 ){
        console.log("value is 3");
        res.render("don'tknow");
    }
    if(value == "1-1"){
        res.render("llc-last");
    }
    if(value == "1-2"){
        res.render("llc-last");
    }
})

app.post("/login",function(req, res){
    let email = req.body.email;
    let password = req.body.password;

    if(email === "admin@gmail.com" && password === "admin@1234"){
        res.redirect("/index");
    }
    else{
        res.redirect("/");
    }
})
app.post("/signup", function(req, res){
    res.redirect("/login");
})
app.listen(port, function(){
    console.log("server is running on prot "+ port);
})