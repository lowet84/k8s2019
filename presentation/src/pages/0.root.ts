import { html } from '../../node_modules/lit-html'
import setup from './10.setup'

const page = html`
  ${setup}
  <section>
    <section>Vertical 1</section>
    <section>
      <div>Vertical 2</div>
      <div>Subtitle</div>
    </section>
  </section>
`

export default page
