import { html } from 'lit-html'
import setup from './10.setup'
import ego from './20.ego'
import docker from './30.docker'

const page = html`
  ${setup}
  ${ego}
  ${docker}
`

export default page
