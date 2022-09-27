const express = require ("express");
const path = require ("path");
const ejs = require("ejs");
const app = express();
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const md5 = require("md5");
const { ppid } = require("process");


const port = process.env.PORT || 5000;
// mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true});
// mongoose.connect("mongodb+srv://shivam:Shivam123@cluster0.gcp5u27.mongodb.net/todolistDB",{useNewUrlParser: true});
mongoose.connect("mongodb+srv://Admin:Admin123@cluster0.cuic2kf.mongodb.net/todolistDB",{useNewUrlParser: true});


app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
// app.set("port", 5000);


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
// const stripe = require("stripe")("");

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Start a US-based business"}],
    [2, { priceInCents: 20000, name : "Manage your business"}],
    [3, { priceInCents: 30000, name : "Add a US business address"}],
    [4, {priceInCents:15000, name:"A place to buy a business address"}],
    [5, {priceInCents:5000, name:"A place to buy a business phone number"}],
])

const loginSchema = {
        firstName : String,
        lastName : String,
        email : String,
        screenName : String,
        password : String,
        confirmPassword : String,
        dateOfBirth : Date,
        zipCode : Number,
        gender : String
    };
    
    const Id = mongoose.model("Id", loginSchema);
    
    const person1 = new Id({
        firstName : "Rocket",
        lastName : "Fire",
        email : "admin@gmail.com",
        screenName : "RocketOfficial",
        password : "admin@1234",
        confirmPassword : 'admin@1234',
        dateOfBirth : 05/06/2011,
        zipCode : 372938,
        gender :"male"
    })
    const person2 = new Id({
        firstName : "Rocket",
        lastName : "Fire",
        email : "user@gmail.com",
        screenName : "RocketOfficial",
        password : "user@1234",
        confirmPassword : 'user@1234',
        dateOfBirth : 05/06/2011,
        zipCode : 372938,
        gender :"male"
    })
    const defaultitems = [ person1, person2];
    

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
app.get("/buymore", function(req,res){
    res.render("buymore")
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

app.post("/signup", function(req,res){
    let newId = new Id({
        firstName : `${req.body.firstname}`,
        lastName : `${req.body.lastname}`,
        email : `${req.body.email}`,
        screenName : `${req.body.screenname}`,
        password : md5(req.body.password),
        confirmPassword : md5(req.body.confirmpassword),
        dateOfBirth : req.body.bday,
        zipCode : req.body.zipcode,
        gender :"male"
    })
    if(md5(req.body.password) === md5(req.body.confirmpassword)){
        newId.save();
    }
    res.redirect("/login");
})
app.post("/login",async function(req, res){
    let email = req.body.email;
    let password = md5(req.body.password);
        Id.find({}, function(err, foundItems){
        console.log(foundItems);
        let page = 0;
            for(var i=0; i<foundItems.length ; i++){
                // console.log(foundItems[i].email +" "+ foundItems[i].password+" /n");
                if((email == foundItems[i].email && foundItems[i].password == password) || (email == "admin@gmail.com" && password == "admin@1234")){
                    console.log("founnd");
                    page++;
                    console.log(page);
                    break;
                }
            } 
            if(page >=1){
                // res.redirect(`/index?name=${email}`)
                res.redirect("/index");
            }
            else{
                res.redirect("/login");
            }
        });

    // if(email === "admin@gmail.com" && password === "admin@1234"){
    //     res.redirect("/index");
    // }
    // else{
    //     res.redirect("/");
    // }
})
app.post("/create-checkout-session", async (req, res)=>{
    try{
        const no = 1;
        const session = await stripe.checkout.sessions.create({
            payment_method_types : ["card"],
            payment_method_types: ['card', 'afterpay_clearpay'],
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
            shipping_address_collection: {
                allowed_countries: ['AU', 'CA', 'GB', 'NZ', 'US'],
              },
            success_url: `${process.env.SERVER_URL}/company.ejs`,
            cancel_url: `${process.env.SERVER_URL}/cancel.html`
        })
        res.json({ url : session.url})
    }
    catch(e){
        res.status(500).json({ error : e.message})
    }
})



// app.listen(app.get("port"), function(){
//     console.log("server is running on prot "+ app.get("port"));
// })
app.listen(port, function(){
    console.log("server is running on prot "+ port);
})