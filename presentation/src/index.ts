import { render, html, TemplateResult } from 'lit-html'
import root from './pages/0.root'

document.addEventListener('DOMContentLoaded', function(event) {
  const el = document.getElementById("slides")
  render(root, el)

  const reveal = require('reveal.js/js/reveal')
  reveal.initialize()
})
