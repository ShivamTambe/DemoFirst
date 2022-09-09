const express = require ("express");
const path = require ("path");
const ejs = require("ejs");
const app = express();
const bodyparser = require('body-parser');
require("dotenv").config();
const cors = require("cors");
const { ppid } = require("process");

const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(
    cors({
        origin: "*",
    })

)

app.use(bodyparser.urlencoded({extended:false}))
app.use(express.json());
// ppid.use(
//     cors({
//         origin: "http://localhost:500"
//     })
// )

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Start a US-based business"}],
    [2, { priceInCents: 20000, name : "Manage your business"}],
    [3, { priceInCents: 30000, name : "Add a US business address"}],
])

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
app.post("/create-checkout-session", async (req, res)=>{
    try{
        const no = 1;
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            mode : "payment",
            line_items: req.body.items.map(item =>{
                const storeItem = storeItems.get(item.id)
                return{
                    price_data: {
                        currency: "usd",
                        product_data:{
                            name :storeItem.name
                        },
                        unit_amount: storeItem.priceInCents,
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/company.ejs`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`
        })
        res.json({ url : session.url})
    }
    catch(e){
        res.status(500).json({ error : e.message})
    }
})
app.post("/signup", function(req, res){
    res.redirect("/login");
})
app.listen(port, function(){
    console.log("server is running on prot "+ port);
})