import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { render, html, TemplateResult } from 'lit-html'

var root = (data: any) => html`
  <section>
    <h3>Setup</h3>
    <div>
      <button
        class="button"
        onclick="{
  window.location.href='./setup.html'
}"
      >
        Change settings
      </button>
    </div>
  </section>

  <section>
    <section>
      <h1>Docker & Kubernetes</h1>
      <h3>Fredrik Löwenhamn</h3>
    </section>
    <section>
      <div>This guy?</div>
      <img src="../assets/ego.jpg" class="image-small" />
      <div class="image-bar">
        <img src="../assets/dotnet.svg" class="image-small fragment" />
        <img src="../assets/docker.svg" class="image-small fragment" />
        <img src="../assets/k8s.png" class="image-small fragment" />
        <img src="../assets/avega.png" class="image-small fragment" />
      </div>
    </section>
  </section>

  <section>
    <section>
      <h2>Docker</h2>
      <img src="../assets/docker.svg" class="image-small" />
    </section>
    <section>
      <h3>Vad är Docker?</h3>
      <div class="fragment">App-virtualisering</div>
      <div class="fragment">Paketering</div>
      <div class="fragment">Deployment</div>
    </section>
    <section>
      <h3>Docker run</h3>
      <div class="fragment">App-virtualisering</div>
      <div class="fragment">Paketering</div>
      <div class="fragment">Deployment</div>
    </section>
  </section>
`

var el: HTMLElement
document.addEventListener('DOMContentLoaded', function(event) {
  const filename = join('settings.json')
  const dir = 'settings'
  const path = join(dir, filename)
  var json: any = {}
  if (existsSync(path)) {
    var data = readFileSync(path, 'utf8')
    json = JSON.parse(data)
  }

  el = document.getElementById('slides')
  render(root(json), el)

  const reveal = require('reveal.js/js/reveal')
  reveal.initialize()
})

document.addEventListener('my-event', function(e: any) {
  render(root({ key: 'hej' }), el)
})
