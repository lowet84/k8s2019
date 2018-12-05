import express from 'express'
import compression from 'compression'

var app = express()
app.use(compression())

if(process.argv[2] === 'dev'){
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}

var number = '#'+Math.floor(Math.random()*16777215).toString(16);

app.get('/color', function (req, res) {
  res.send(`${number}`)
})
 
app.use(express.static('web'))

app.listen(3000)