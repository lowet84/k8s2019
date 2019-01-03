import { html } from 'lit-html'
import { existsSync, readFileSync, writeFileSync } from 'fs'

const filename = 'settings.json'
const loadSettings = () => {
  console.log('loading settings')
}

var data: { username: string }

const page = html`
  <section>
    <h3>Setup</h3>
    <div><button class="button">Change settings</button></div>
  </section>
`

export default page
