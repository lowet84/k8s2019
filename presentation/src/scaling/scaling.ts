import { render, html } from 'lit-html'
import { Client } from 'ssh2';

const electronSettings = window
  // @ts-ignore
  .require('electron')
  .remote.require('electron-settings')

var settings: Settings = JSON.parse(electronSettings.get('settings'))

var root = () => html`
  <div class="title">
    <button @click="${() => (window.location.href = './slides.html')}">
      back</button
    ><span>Scaling</span>
  </div>
  <div class="info-text">
    WiFi: elevate-kube / kubernetes - http://${settings.host}
  </div>
  <div class="v-spacer"></div>
  <div class="v-spacer"></div>
  <div class="info-text border">
    kubectl scale deploy/demo-deployment --replicas=X
  </div>
  <div class="button-row">
  <button @click="${() => scale(1)}">1</button>
  <button @click="${() => scale(2)}">2</button>
  <button @click="${() => scale(5)}">5</button>
  <button @click="${() => scale(8)}">8</button>
  <button @click="${() => scale(10)}">10</button>
  <button @click="${() => scale(15)}">15</button>
  <button @click="${() => scale(20)}">20</button>
  </div>
  <webview src="http://${settings.host}"></webview>
`

const scale = (replicas: number) => {
  var conn: Client = window
    // @ts-ignore
    .require('electron')
    .remote.require('./main')
    .getSshClient()

    conn
    .on('ready', function() {
      conn.exec(`kubectl scale deploy/demo-deployment --replicas=${replicas}`, function(
        err,
        stream
      ) {
        if (err) throw err
        stream
          .on('close', function() {
            conn.end()
          })
      })
    })
    .connect({
      host: settings.host,
      port: 22,
      username: settings.username,
      privateKey: settings.privateKey
    })
}

document.addEventListener('DOMContentLoaded', function(event) {
  render(root(), document.body)
})
