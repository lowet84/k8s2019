import { html, render, TemplateResult } from 'lit-html'

var colorData = {}

const template = items => html`
  <div class="root">
    ${
      items.map(
        d => html`
          <div class="item ">
            <div class="box item--faded" style="${getStyle(d)}"></div>
            <div class="caption">${d.id} ${d.name}</div>
          </div>
        `
      )
    }
  </div>
`

var getStyle = data => {
  var time: any = new Date()
  var diff = time - data.time
  var seconds = 20
  var factor = (((seconds * 1000)) - diff + 400) / (seconds * 1000)
  if (factor > 1) factor = 1

  if(factor<0.05) delete colorData[data.id]
  
  var r = data.color.r * factor
  var g = data.color.g * factor
  var b = data.color.b * factor
  return `background:rgb(${r},${g},${b})`
}

window.onload = () => {
  const el = document.body

  window.setInterval(function() {
    color()
    var items = Object.keys(colorData).map(d => colorData[d])
    render(template(items), el)
  }, 100)
}

var color = async () => {
  var url = (window['api'] || '') + '/api'
  var value = await fetch(url).catch(error => console.log(error))
  if (!value) return
  var data = await value.json()
  data.time = new Date()
  colorData[data.id] = data
}
