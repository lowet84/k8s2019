import { html, render, TemplateResult } from 'lit-html'

const root: TemplateResult = html`
  <div id="root" class="root"></div>
`

window.onload = () => {
  const el = document.body
  render(root, el)
  test('/api')
}

var test = async (path: string) => {
  var url = (window['api'] || '') + path
  var value = await fetch(url).catch(error => console.log(error))
  if (!value) return
  var root = document.getElementById('root')
  var data = await value.json()
  root.style.backgroundColor = `rgb(${data.color.r},${data.color.g},${data.color.b})`
}
