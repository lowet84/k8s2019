import { html, render, TemplateResult } from 'lit-html'

var colorData = {}

const template = items => html`
  <div class="root">
    ${
      Object.keys(items)
        .sort((a, b) => a.localeCompare(b))
        .map(
          d => html`
            <div class="category">
              <div>${d}</div>
              <div class="category-content">
                ${
                  Object.keys(items[d]).map(
                    e => html`
                      <div
                        class="box item--faded"
                        style="${getStyle(items[d][e])}"
                      ></div>
                    `
                  )
                }
              </div>
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
  var factor = (seconds * 1000 - diff + 400) / (seconds * 1000)
  if (factor > 1) factor = 1

  if (factor < 0.05) delete colorData[data.id]

  var r = data.color.r * factor
  var g = data.color.g * factor
  var b = data.color.b * factor
  return `background:rgb(${r},${g},${b})`
}

window.onload = () => {
  const el = document.body
  const min = 80
  const max = 120
  var interval = Math.floor(Math.random() * (max - min +1)) + min
  window.setInterval(function() {
    getColorFromServer()
    var items = Object.keys(colorData).map(d => colorData[d])
    var sorted = items.reduce((acc, item) => {
      if (acc[item.name] == undefined) acc[item.name] = {}
      acc[item.name][item.id] = item
      return acc
    }, {})
    render(template(sorted), el)
  }, interval)
}

var getColorFromServer = async () => {
  var url = (window['api'] || '') + '/api'
  var value = await fetch(url).catch(error => console.log(error))
  if (!value) return
  var data = await value.json()
  data.time = new Date()
  colorData[data.id] = data
}
