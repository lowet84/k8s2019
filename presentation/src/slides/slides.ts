import { render, html } from 'lit-html'
import { getCode } from './code'
import { batches } from './examples'
import { sshComponent } from './ssh'
import { SshBatch } from './SshBatch'


const electronSettings = window
  // @ts-ignore
  .require('electron')
  .remote.require('electron-settings')

var settings: Settings
console.log('starting')

var root = (settings: Settings, batches: { [name: string]: SshBatch }) => html`
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
    <section><h2>Vanliga deployment-problem</h2></section>
    <section>
      <h2>Vanliga deployment-problem</h2>
      <div>Komplicerat att installera</div>
      <div class="fragment">Manuella steg</div>
      <div class="fragment">Filkopiering</div>
      <div class="fragment">Dependency-hell</div>
    </section>
    <section>
      <div>"Works on my machine"</div>
      <img src="../assets/works-on-my-machine.jpg" class="image-large" />
    </section>
    <section>
      <h2>Docker</h2>
      <img src="../assets/docker.svg" class="image-large" />
    </section>
    <section>
      <h3>Vad är Docker?</h3>
      <div class="fragment">Alternativ till Virtual Machine</div>
      <div class="fragment">App-virtualisering</div>
      <div class="fragment">Paketering</div>
      <div class="fragment">Deployment</div>
      <div class="fragment">Sandbox</div>
    </section>
    <section>
      <h3>Image - Container</h3>
      <div class="fragment">Class - Object</div>
      <div class="image-bar">
        <img src="../assets/class.jpg" class="image-medium fragment" />
        <img src="../assets/object.gif" class="image-medium fragment" />
      </div>
    </section>
    <section>
      <h3>Dockerfile</h3>
      <div class="fragment">4 kommandon</div>
      <div class="fragment">FROM</div>
      <div class="fragment">ADD</div>
      <div class="fragment">RUN</div>
      <div class="fragment">CMD</div>
    </section>
    <section>
      <h3>Dockerfile</h3>
      <div class="fragment">4 kommandon</div>
      <div class="fragment">FROM</div>
      <div class="fragment">ADD</div>
      <div class="fragment">RUN</div>
      <div class="fragment">CMD</div>
    </section>
    <section data-background="#505050">
      <h3>Docker build</h3>
      <div class="descriptive-text">index.js</div>
      <code>${getCode(batches['dockerBuild'].files['indexjs'])}</code>
      <div class="vertical-spacer"></div>
      <div class="descriptive-text">Dockerfile</div>
      <code>${getCode(batches['dockerBuild'].files['dockerfile'])}</code>
      <div>${sshComponent(batches['dockerBuild'], settings)}</div>
    </section>
    <section>
      <h3>Livet utanför Sandboxen</h3>
      <div class="fragment">4 kommandon till</div>
      <div class="fragment">Pull</div>
      <div class="fragment">Push</div>
      <div class="fragment">Port</div>
      <div class="fragment">Volume</div>
    </section>
    <section data-background="#505050">
      <h3>Docker pull & run</h3>
      <div>WiFi: elevate-kube / kubernetes</div>
      <div>http://${settings.host}:3000</div>
      <div>${sshComponent(batches['dockerPortVolume'], settings)}</div>
      <div class="webview">
        <webview
          id="example2-webview"
          class="webview-content"
          src="http://${settings.host}:3000"
        ></webview
        ><button @click="${() => refreshWebview('example2-webview')}">
          Refresh
        </button>
      </div>
    </section>
  </section>

  <section>
    <section data-transition="none"><h3>Det börjar bli trångt...</h3></section>
    <section data-transition="none">
      <h3>Det börjar bli trångt...</h3>
      <img src="../assets/potato.jpg" class="image-large" />
    </section>
    <section data-transition="none">
      <h3>Det börjar bli trångt...</h3>
      <img src="../assets/server.jpg" class="image-large" />
    </section>
    <section data-transition="none">
      <h3>Det börjar bli trångt...</h3>
      <img src="../assets/room.jpg" class="image-large" />
    </section>
    <section data-transition="none">
      <h3>Det börjar bli trångt...</h3>
      <img src="../assets/facebook.jpg" class="image-large" />
    </section>
    <section>
      <div class="image-bar">
        <img src="../assets/actual-potato.png" class="image-small" />
        <img src="../assets/arrow.png" class="image-small" />
        <img src="../assets/lule.png" class="image-medium" />
      </div>
    </section>
    <section>
      <h2>Kubernetes</h2>
      <img src="../assets/k8s.png" class="image-medium" />
    </section>
    <section>
      <h3>Kubernetes</h3>
      <div class="fragment">Orkestrerings-plattform</div>
      <div class="fragment">Startad av Google</div>
      <div class="fragment">Skalbarhet</div>
      <div class="fragment">Pålitlighet</div>
    </section>
    <section>
      <h3>Kubernetes - struktur</h3>
      <div class="fragment">Master</div>
      <div class="fragment">Node</div>
      <div class="fragment">Network layer</div>
    </section>
    <section>
      <h3>Kubernetes - struktur</h3>
      <img src="../assets/master-node.png" class="image-medium" />
    </section>
    <section>
      <h3>Kubernetes - delar</h3>
      <div class="fragment">Pod</div>
      <div class="fragment">Deployment</div>
      <div class="fragment">Service</div>
      <div class="fragment">Ingress</div>
    </section>
    <section>
      <h3>Kubernetes - delar</h3>
      <img src="../assets/k8s-overview.png" class="image-large" />
    </section>
    <section data-background="#505050">
      <h3>Deployment</h3>
      <div class="code-to-side">
        <div class="side-code-box">
          <div class="descriptive-text">deployment.yaml</div>
          <code>${getCode(batches['kubernetesDeploy'].files['deploy'])}</code>
        </div>
        <div class="side-ssh">
          ${sshComponent(batches['kubernetesDeploy'], settings, 'medium')}
        </div>
      </div>
    </section>
    <section data-background="#505050">
      <h3>Service</h3>
      <div class="code-to-side">
        <div class="side-code-box">
          <div class="descriptive-text">service.yaml</div>
          <code>${getCode(batches['kubernetesService'].files['service'])}</code>
        </div>
        <div class="side-ssh">
          ${sshComponent(batches['kubernetesService'], settings, 'medium')}
        </div>
      </div>
    </section>
    <section data-background="#505050">
      <h3>Ingress</h3>
      <div class="code-to-side">
        <div class="side-code-box">
          <div class="descriptive-text">ingress.yaml</div>
          <code>${getCode(batches['kubernetesIngress'].files['ingress'])}</code>
        </div>
        <div class="side-ssh">
          ${sshComponent(batches['kubernetesIngress'], settings, 'medium')}
        </div>
      </div>
    </section>
    <section data-background="#505050">
      <h3>Scaling</h3>
      <button @click="${() => (window.location.href = './scaling.html')}">
        demo scaling
      </button>
    </section>
  </section>
`

const refreshWebview = (id: string) => {
  var webview = document.getElementById(id)
  // @ts-ignore
  webview.reload()
}

var myBatches: { [name: string]: SshBatch }
document.addEventListener('update', event => {
  if(!myBatches) myBatches = batches(settings)
  electronSettings.set('settings', JSON.stringify(settings))
  render(root(settings, myBatches), el)
  var sshBoxes = Object.values(document.getElementsByClassName('ssh-box'))
  sshBoxes.forEach(box => {
    box.scrollTop = box.scrollHeight
  })
})

var el: HTMLElement
document.addEventListener('DOMContentLoaded', function(event) {
  var json = electronSettings.get('settings')
  if (!json) {
    settings = <Settings>{}
  } else {
    settings = JSON.parse(json)
  }
  el = document.getElementById('slides')
  document.dispatchEvent(new Event('update'))

  const reveal = require('reveal.js/js/reveal')
  reveal.initialize()
})
