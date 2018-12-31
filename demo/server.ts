import express from 'express'
import compression from 'compression'
import * as fs from 'fs'

var app = express()
app.use(compression())

var dev = process.argv[2] === 'dev'

if (dev) {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
}

var generateColor = function(): { r: number; g: number; b: number } {
  var zeroColor = Math.floor(Math.random() * 3)
  var spread = Math.floor(Math.random() * 255)
  var colors = [0, 0, 0]
  colors[zeroColor % 3] = 0
  colors[(zeroColor + 1) % 3] = spread
  colors[(zeroColor + 2) % 3] = 255 - spread

  var r = colors[0]
  var g = colors[1]
  var b = colors[2]

  return { r, g, b }
}

class ColorCounter {
  public id: string
  public name: string
  public color: { r: number; g: number; b: number }

  constructor(name: string, color: { r: number; g: number; b: number }) {
    this.id = `${Math.floor(Math.random() * 16777215)}`
    ;(this.color = color), (this.name = name)
  }

  colorRate = 10

  public updateColor() {
    for (let index = 0; index < this.colorRate; index++) {
      if (this.color.r > 0 && this.color.b == 0) {
        this.color.r--
        this.color.g++
      }
      if (this.color.g > 0 && this.color.r == 0) {
        this.color.g--
        this.color.b++
      }
      if (this.color.b > 0 && this.color.g == 0) {
        this.color.r++
        this.color.b--
      }
    }
  }
}

var computerName = fs.existsSync('/etc/hostname')
  ? fs.readFileSync('/etc/hostname', 'utf8')
  : 'Dummy'

var devNames = ['alpha', 'bravo', 'charlie', 'delta', 'echo']
var devItems = devNames.map(d => new ColorCounter(d, generateColor()))

var items: ColorCounter[] = dev
  ? devItems
  : [new ColorCounter(computerName, generateColor())]
var counter = 0

var getCounter = function(): number {
  counter = (counter + 1) % items.length
  return counter
}

var randomizeDevEvents = function() {
  var chance = 100
  var rnd = Math.floor(Math.random() * chance)
  if(rnd == 0){
    var index = Math.floor(Math.random() * items.length)
    items.splice(index,1)
  }
  else if(rnd==1){
    var index = Math.floor(Math.random() * devNames.length)
    items.push(new ColorCounter(devNames[index], generateColor()))
  }
}

app.get('/api', function(req, res) {
  if (dev) {
    randomizeDevEvents()
  }
  var item = items[getCounter()]
  item.updateColor()
  res.send({ id: item.id, color: item.color, name: item.name })
})

app.use(express.static('web'))

app.listen(3000)
