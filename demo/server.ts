import express from 'express'
var app = express()
 
var number = '#'+Math.floor(Math.random()*16777215).toString(16);

app.get('/color', function (req, res) {
  res.send(`${number}`)
})
 
app.use(express.static('web'))

app.listen(3000)