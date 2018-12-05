import express from 'express'
import compression from 'compression'

var app = express()
app.use(compression())
 
var number = '#'+Math.floor(Math.random()*16777215).toString(16);

app.get('/color', function (req, res) {
  res.send(`${number}`)
})
 
app.use(express.static('web'))

app.listen(3000)