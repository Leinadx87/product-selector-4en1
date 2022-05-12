import { LitElement, html, } from 'lit-element';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<gft-financial-overview></gft-financial-overview>
```

##styling-doc

@customElement gft-financial-overview
*/
export class GftFinancialOverview extends LitElement {
  static get is() {
    return 'gft-financial-overview';
  }

  // Declare properties
  static get properties() {
    return {
      name: { type: String, },
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.name = 'Cells';
  }

  

  // Define a template
  render() {
    return html`
    `;
  }
}
