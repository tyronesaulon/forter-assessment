import {LitElement, html} from 'lit';
import style from './admin-config.css.js';
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

/**
 * An example element.
 */
export class MyElement extends LitElement {
  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       * @type {string}
       */
      name: {type: String},

      /**
       * The number of times the button has been clicked.
       * @type {number}
       */
      count: {type: Number},
    };
  }

  constructor() {
    super();
    this.name = 'Bot';
    this.count = 0;
    this.socket = io('http://localhost:3000', {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*"
    }});
    this.socket.on('new connection', console.log);
  }

  static styles = [style];

  onButtonClick() {
    this.count++;
  }

  render() {
    const {name, count} = this;
    return html`
      <div>Hi, my name is: ${name}</div>
      <button @click="${this.onButtonClick}">Current clicks: ${count}</button>
    `;
  }
}

window.customElements.define('my-element', MyElement);
