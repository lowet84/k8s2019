import { html } from 'lit-html'
import { existsSync, readFileSync, writeFileSync } from 'fs'

const filename = 'settings.json'
const loadSettings = () => {
  console.log('loading settings')
}

var data: { username: string }

const page = html`
  <section>
    <section><h3>Setup</h3></section>
    <section>
      <div>Ssh private key</div>
      <div><button class="button">Select key</button></div>
    </section>
    <section>
      <div>Username</div>
      <textarea onchange="window.save()">dslijsdf</textarea>
    </section>
  </section>
`

export default page
