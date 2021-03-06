import { render, html } from 'lit-html'
import { getCode } from './code'
import { batches } from './examples'
import { sshComponent } from './ssh'
import { SshBatch } from './SshBatch'
import { getTranslation, Translation } from './Translation'

var selectedTranslation: Translation

const electronSettings = window
  // @ts-ignore
  .require('electron')
  .remote.require('electron-settings')

var settings: Settings

var root = (
  settings: Settings,
  batches: { [name: string]: SshBatch },
  translation: Translation
) => html`
  <section>
    <section><h1>${translation.conclusion}</h3></section>
    <section>
      <h2>${translation.whatIsDocker}</h2>
      <div>${translation.altToVm}</div>
      <div>${translation.packaging}</div>
      <div>Deployment</div>
    </section>
    <section>
      <h2>${translation.worksDocker}</h2>
      <div>Image - Container</div>
      <div>Dockerfile</div>
      <div>Port & Volume</div>
    </section>
    <section>
      <h2>Kubernetes</h2>
      <div>${translation.orchestrationPlatform}</div>
      <div>Pod - Service - Ingress</div>
      <div>Scaling</div>
    </section>
    <section><h3>${translation.questions}</h3></section>
  </section>

  <section>
    <section>
      <h3>Setup</h3>
      <div>
        <button onclick="{window.location.href='./setup.html'}">Setup</button>
      </div>
    </section>
    <section>
      <h3>Reset</h3>
      <div>${sshComponent(batches['reset'], settings)}</div>
    </section>
  </section>

  <section>
    <section>
      <h1>Docker & Kubernetes</h1>
      <h3>Fredrik Löwenhamn</h3>
      <div>WiFi: elevate-kube / kubernetes</div>
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
    <section><h2>${translation.commonDeploymentProblems}</h2></section>
    <section>
      <h2>${translation.commonDeploymentProblems}</h2>
      <div>${translation.complicatedInstall}</div>
      <div class="fragment">${translation.manualSteps}</div>
      <div class="fragment">${translation.fileCopy}</div>
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
      <h3>${translation.whatIsDocker}</h3>
      <div class="fragment">${translation.altToVm}</div>
      <div class="fragment">${translation.appVirt}</div>
      <div class="fragment">Sandbox</div>
      <div class="fragment">${translation.packaging}</div>
      <div class="fragment">Deployment</div>
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
      <div>${translation.fourCommands}</div>
      <div class="fragment">FROM</div>
      <div class="fragment">ADD</div>
      <div class="fragment">RUN</div>
      <div class="fragment">CMD</div>
    </section>
    <section data-background="#505050">
      <h3>Docker build</h3>
      <div class="black-selection descriptive-text">index.js</div>
      <code>${getCode(batches['dockerBuild'].files['indexjs'])}</code>
      <div class="vertical-spacer"></div>
      <div class="descriptive-text black-selection">Dockerfile</div>
      <code>${getCode(batches['dockerBuild'].files['dockerfile'])}</code>
      <div>${sshComponent(batches['dockerBuild'], settings)}</div>
    </section>
    <section>
      <h3>${translation.lifeOutsideSandbox}</h3>
      <div>${translation.fourMoreCommands}</div>
      <div class="fragment">Pull</div>
      <div class="fragment">Push</div>
      <div class="fragment">Port</div>
      <div class="fragment">Volume</div>
    </section>
    <section data-background="#505050">
      <h3>Docker pull & run</h3>
      <div>WiFi: elevate-kube / kubernetes</div>
      <div>http://${settings.host}:3000</div>
      <div>
        ${sshComponent(batches['dockerPortVolume'], settings, 'smaller')}
      </div>
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
    <section data-transition="none">
      <h3>${translation.itsGettingCrowded}</h3>
    </section>
    <section data-transition="none">
      <h3>${translation.itsGettingCrowded}</h3>
      <img src="../assets/potato.jpg" class="image-large" />
    </section>
    <section data-transition="none">
      <h3>${translation.itsGettingCrowded}</h3>
      <img src="../assets/server.jpg" class="image-large" />
    </section>
    <section data-transition="none">
      <h3>${translation.itsGettingCrowded}</h3>
      <img src="../assets/room.jpg" class="image-large" />
    </section>
    <section data-transition="none">
      <h3>${translation.itsGettingCrowded}</h3>
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
      <div>${translation.orchestrationPlatform}</div>
      <div class="fragment">${translation.startedByGoogle}</div>
      <div class="fragment">${translation.scalability}</div>
      <div class="fragment">${translation.reliability}</div>
    </section>
    <section>
      <h3>Kubernetes - ${translation.structure}</h3>
      <div>Master</div>
      <div class="fragment">Node</div>
      <div class="fragment">Network layer</div>
    </section>
    <section>
      <h3>Kubernetes - ${translation.structure}</h3>
      <img src="../assets/master-node.png" class="image-medium" />
    </section>
    <section>
      <h3>Kubernetes - ${translation.parts}</h3>
      <div>Pod</div>
      <div class="fragment">Deployment</div>
      <div class="fragment">Service</div>
      <div class="fragment">Ingress</div>
    </section>
    <section>
      <h3>Kubernetes - ${translation.parts}</h3>
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
  if (!myBatches) myBatches = batches(settings)
  electronSettings.set('settings', JSON.stringify(settings))
  render(root(settings, myBatches, selectedTranslation), el)
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
  selectedTranslation = getTranslation(settings.language)
  console.log(settings.language)
  el = document.getElementById('slides')
  document.dispatchEvent(new Event('update'))

  const reveal = require('reveal.js/js/reveal')
  reveal.initialize()
})
