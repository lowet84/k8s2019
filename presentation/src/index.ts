import { render } from '../node_modules/lit-html'
import root from './components/root'


document.addEventListener('DOMContentLoaded', function(event) {
  const el = document.getElementById("slides")
  render(root, el)

  const reveal = require('reveal.js/js/reveal')
  reveal.initialize()
})
