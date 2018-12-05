import { html, render, TemplateResult } from 'lit-html'

const root: TemplateResult = html`
  <div class="root"><h1 class="test">Well, hello there!</h1></div>
`

window.onload = () => {
  const el = document.body
  render(root, el)
}

var test = async (path: string) => {
  var url = (window['api'] || '') + path
  console.log(url)
  var value = await fetch(url).catch(error => console.log(error))
  if (!value) return
  console.log(await value.text())
}

test('/color')
