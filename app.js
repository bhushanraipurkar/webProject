var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var imgModel=require("model")
 
var fs = require('fs');
var path = require('path');
require('dotenv/config');

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('connected')
    });


   

    
// Step 3 - code was added to ./models.js
 
// Step 4 - set up EJS
 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
// Set EJS as templating engine 
app.set("view engine", "ejs");

app.use(express.static('public'));

var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + file.originalname+'-'+path.extname(file.originalname))
    }
});
 
var upload = multer({ storage: storage });

var imgModel = require('./model');

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/upload', (req, res) => {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('imagesPage', { items: items });
        }
    });
});

app.post('/milgaya', upload.single('image'), (req, res, next) => {
 
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'html/zip'
        }
    }
    imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});


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

