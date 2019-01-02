import { html } from '../../node_modules/lit-html'

const page = html`
  <section>
    <section><h3>Setup</h3></section>
    <section>
      <div>Ssh private key</div>
      <div><button class="button">Select key</button></div>
    </section>
  </section>
`

var key = undefined

const loadsettings = () => {}

export default page
