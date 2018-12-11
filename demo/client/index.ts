import { html, render, TemplateResult } from 'lit-html'

var colorData = {}

const template = items => html`
  <div class="root">
    ${
      items.map(
        d => html`
          <div
            class="item"
            style="background:rgb(${d.color.r},${d.color.g},${d.color.b})"
          ></div>
        `
      )
    }
  </div>
`

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
  colorData[data.id] = data
  // root.style.backgroundColor = `rgb(${data.color.r},${data.color.g},${
  //   data.color.b
  // })`
}
