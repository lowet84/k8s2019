import { render, html } from 'lit-html'
// @ts-ignore
const { dialog } = window.require('electron').remote
const electronSettings = window
  // @ts-ignore
  .require('electron')
  .remote.require('electron-settings')

interface Settings {
  username: string
  keyPair: { privateKey: string; publicKey: string }
}

var settings: Settings

var root = (data: Settings) => html`
  <section>
    <section><h3>Setup</h3></section>
    <section>
      <h4>Private key</h4>
      <div>
        <button onclick="document.dispatchEvent(new Event('generate-key'))">
          Generate
        </button>
        <button onclick="document.dispatchEvent(new Event('load-key'))">
          Load key
        </button>
        <button onclick="document.dispatchEvent(new Event('delete-key'))">
          Delete
        </button>
      </div>
      <div>${data.keyPair ? 'Key loaded' : 'No key'}</div>
    </section>
    <section>
      <h4>Private key</h4>
      
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

var update = () => {
  console.log('saving settings')
  console.log(settings)
  electronSettings.set('settings', JSON.stringify(settings))
  render(root(settings), el)
}

var el: HTMLElement
document.addEventListener('DOMContentLoaded', function(event) {
  var json = electronSettings.get('settings')
  if (!json) {
    console.log('generating initial settings')
    settings = {
      username: '',
      keyPair: undefined
    }
  }
  else{
    settings = JSON.parse(json)
  }
  el = document.getElementById('slides')
  update()

  const reveal = require('reveal.js/js/reveal')
  reveal.initialize()
})

document.addEventListener('load-key', function(e: Event) {
  dialog.showOpenDialog(
    {
      properties: ['openFile'],
      filters: [{ name: 'PuTTY Private key', extensions: ['ppk'] }]
    },
    function(files: string[]) {
      if (files !== undefined) {
        settings.username = files[0]
        update()
      }
    }
  )
})

document.addEventListener('generate-key', function(e: Event) {
  var keypair = require('keypair')
  var pair = keypair()
  settings.keyPair = {
    privateKey: pair.private,
    publicKey: pair.public
  }
  update()
})

document.addEventListener('delete-key', function(e: Event) {
  settings.keyPair = undefined
  update()
})
