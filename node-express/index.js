const { Console } = require('console');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes',(req,res,next)=>{

    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('I send all dishes to you');
    next();
});

app.get('/dishes/:dishID',(req,res,next) =>{
    res.end("will send details of the dishes! "+req.params.dishID+ " to you!");

});

app.post('/dishes/:dishID',(req,res,next) =>{
    console.log("entra aqui");
    res.end(`will add the dish ${req.body.name} with details ${req.body.description}`);
});

app.put('/dishes/:dishID',(req,res,next) =>{
    res.statusCode = 200;
    res.write(`Will update the dish ${req.params.dishID} `);
    res.end(`Will update the dish ${req.body.name} with  details ${req.body.description}`)
});

app.delete('/dishes/:dishID',(req,res,next) =>{
    res.statusCode = 200;
    res.end(`Deliting dish ${req.params.dishID}`);
});


app.use(express.static(__dirname+ '/public'))


app.use((req,res,next) =>{
 console.log(req.header);

    res.statusCode = 200;
    res.setHeader('Content-type','text/html');
    res.end('<html><body><h1>Hola mundo</h1></body></html>');
});

const server = http.createServer(app);
server.listen(port,hostname,() => {
    console.log(`Server running  at http://${hostname} with port ${port}`);
})