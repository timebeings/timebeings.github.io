import { React, ReactDOM } from "https://unpkg.com/es-react@16.8.30/index.js";
import htm from "https://unpkg.com/htm@2.1.1/dist/htm.mjs";
import csz from "https://unpkg.com/csz@0.1.2/index.js";
import Calculator from "./calculator.js";

window.React = React;
window.css = csz;
window.html = htm.bind(React.createElement);
const App = () =>
  html`
    <${Calculator} />
  `;

ReactDOM.render(
  html`
    <${App}>footer content here<//>
  `,
  document.getElementById("root")
);
