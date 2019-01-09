import { render, html } from 'lit-html'
const electronSettings = window
  // @ts-ignore
  .require('electron')
  .remote.require('electron-settings')

var settings: Settings

var root = (data: Settings) => html`
  <section>
    <h3>Setup</h3>
    <div>
      <button onclick="{window.location.href='./setup.html'}">Setup</button>
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
      <h2>Vanliga deployment-problem</h2>
      <div class="fragment">Komplicerat att installera</div>
      <div class="fragment">Manuella steg</div>
      <div class="fragment">Filkopiering</div>
      <div class="fragment">Dependency-hell</div>
    </section>
    <section>
      <div>"Works on my machine"</div>
      <img src="../assets/works-on-my-machine.jpg" class="image-large"/>
    </section>
    <section>
      <h2>Docker</h2>
      <img src="../assets/docker.svg" class="image-large"/>
    </section>
    <section>
      <h3>Vad är Docker?</h3>
      <div class="fragment">App-virtualisering</div>
      <div class="fragment">Paketering</div>
      <div class="fragment">Deployment</div>
    </section>
  </section>
`

var update = () => {
  electronSettings.set('settings', JSON.stringify(settings))
  render(root(settings), el)
}

var el: HTMLElement
document.addEventListener('DOMContentLoaded', function(event) {
  var json = electronSettings.get('settings')
  if (!json) {
    settings = <Settings>{}
  } else {
    settings = JSON.parse(json)
  }
  el = document.getElementById('slides')
  update()

  const reveal = require('reveal.js/js/reveal')
  reveal.initialize()
})
