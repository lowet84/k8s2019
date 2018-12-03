import express from 'express'
var app = express()
 
var number = Math.random(); 

app.get('/', function (req, res) {
  res.send(`${number}`)
})
 
app.listen(3000)