import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './ProductSelector-styles.js';
import { GftFinancialOverviewV0 } from '../demo/mocks/BGADP.js';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<product-selector></product-selector>
```

##styling-doc

@customElement gft-financial-overview-get-service
*/
export class GftFinancialOverviewGetService extends LitElement {
  static get is() {
    return 'gft-financial-overview-get-service';
  }

  // Declare properties
  static get properties() {
    return {
      url: { type: String, },
      metho: { type: String },
    };
  }

  // Initialize properties
  constructor(config) {
    super();
    this.dp = new GftFinancialOverviewV0(config);
    console.log("desde gftFinancial")    
  }
  
  _mapeoBasico(data = {}){
    const newArray = this._copyData(data);
    const contracts = (newArray.data || {}).contracts || [];
    let dataReduce = contracts.reduce((arrayMapped, contract) => {
      contract.detail.specificsAmounts.map((specificAmount) =>{
        specificAmount.amounts.map((amount) => {
          if (specificAmount.id === 'CURRENT_BALANCE') {
            let index = arrayMapped.findIndex(
              (data) => data.currency === amount.currency
            );
            let product = {
              alias: contract.alias,
              balance: amount.amount,
              entity: 'BBVAESMMXX',
              id: contract.id,
              printedNumber: contract.number,
            };
            if (index > -1) {
              arrayMapped[index]['products'].push(product);
            } else {
              arrayMapped.push({
                currency: amount.currency,
                products: [product],
              });
            }
          }
        });
      });
      return arrayMapped;
    }, []);
    return dataReduce;  
  }
  

  // Define a template
  render() {
    return html`
      <slot></slot>     

      
    `;
  }

  
  
}
