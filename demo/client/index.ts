import { html, render, TemplateResult } from 'lit-html';

const root: TemplateResult = html`
  <h1>Well, hello there!</h1>
`;

window.onload = () => {
    const el = document.body;
    render(root, el);
}