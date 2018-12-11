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

var zeroColor = Math.floor(Math.random() * 3)
var spread = Math.floor(Math.random() * 255)
var colors = [0, 0, 0]
colors[zeroColor % 3] = 0
colors[(zeroColor + 1) % 3] = spread
colors[(zeroColor + 2) % 3] = 255 - spread

console.log(zeroColor)
console.log(spread)
console.log(colors)

var r = colors[0]
var g = colors[1]
var b = colors[2]

var updateColor = function() {
  if (r > 0 && b == 0) {
    r--
    g++
  }
  if (g > 0 && r == 0) {
    g--
    b++
  }
  if (b > 0 && g == 0) {
    r++
    b--
  }
}

app.get('/api', function(req, res) {
  updateColor()
  res.send({ id, color: { r, g, b } })
})

app.use(express.static('web'))

app.listen(3000)
