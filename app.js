var express = require('express')
var app = express()

var imgModel=require("model")
 

var path = require('path');
require('dotenv/config');



 
// Set EJS as templating engine 
app.set("view engine", "ejs");

app.use(express.static('public'));



app.get('/',(req,res)=>{
    res.render('index')
})


app.get('/send',(req,res)=>{
    res.render("imagesPage");
})


app.get('/template',(req,res)=>{
    res.render('HTMLtemplate');
})

app.get('/paymentpage',(req,res)=>{
    res.render('paymentPage');
})


var port = process.env.PORT || '3000'
app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})

