import express from 'express'
import compression from 'compression'

var app = express()
app.use(compression())

if (process.argv[2] === 'dev') {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
}

var id = Math.floor(Math.random() * 16777215)
var r = Math.floor(Math.random() * 255)
var g = Math.floor(Math.random() * 255)
var b = Math.floor(Math.random() * 255)

var updateColor = function(){
  if(r > 0 && b == 0){
    r--;
    g++;
  }
  if(g > 0 && r == 0){
    g--;
    b++;
  }
  if(b > 0 && g == 0){
    r++;
    b--;
  }
}

app.get('/api', function(req, res) {
  updateColor()
  res.send({ id, color: { r, g, b } })
})

app.use(express.static('web'))

app.listen(3000)
