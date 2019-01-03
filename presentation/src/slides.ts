import { render, html } from 'lit-html'

interface Settings {
  username: string
}

var settings: Settings = {
  username: ''
}

var root = (data: Settings) => html`
  <section>
    <section><h3>Setup</h3></section>
    <section>
      <h4>Username</h4>
      <button onclick="document.dispatchEvent(new Event('load-key'))">
        Load key
      </button>
    </section>
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
  // const filename = join('settings.json')
  // const dir = 'settings'
  // const path = join(dir, filename)
  // var json: any = {}
  // if (existsSync(path)) {
  //   var data = readFileSync(path, 'utf8')
  //   json = JSON.parse(data)
  // }

  el = document.getElementById('slides')
  render(root(settings), el)

  const reveal = require('reveal.js/js/reveal')
  reveal.initialize()
})

document.addEventListener('load-key', function(e: Event) {
  console.log(window)
})
