import { TemplateResult, html } from "lit-html";

var getCode = (code: string): TemplateResult => {
  var lines = code.split(/\r?\n/)
  return html`
    <div class="center">
      <div class="code">
        ${
          lines.map(
            d =>
              html`
                ${d}<br />
              `
          )
        }
      </div>
    </div>
  `
}

export { getCode }
