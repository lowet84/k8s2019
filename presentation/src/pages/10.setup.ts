import { html } from '../../node_modules/lit-html'

const page = html`
  <section>
    <div>Setup</div>

    <button
      class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
    >
      Load key
    </button>
    <form action="#">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label dark">
        <input class="mdl-textfield__input" type="text" id="sample3" />
        <label class="mdl-textfield__label" for="sample3">Server url</label>
      </div>
    </form>
  </section>
`

var key = undefined

const loadsettings = () => {}

export default page
