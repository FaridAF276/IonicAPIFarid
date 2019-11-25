var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors({origin: "*"}));
app.use(bodyParser.json({type : '*/*'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/position', (req, res)=>{
    let lat = req.query['lat'];
    let long = req.query['long'];
    console.log(lat+ '\t'+ long);
});

app.listen(8080, ()=>{
    console.log("Starting server, and watching 8080...");
})