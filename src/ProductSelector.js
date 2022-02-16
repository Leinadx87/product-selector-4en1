import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './ProductSelector-styles.js';
import { GftFinancialOverviewV0 } from '../demo/mocks/BGADP.js';
import './DataManager';
import { DataManager } from './DataManager';
/**
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
<product-selector></product-selector>
```

##styling-doc

@customElement product-selector
*/
export class ProductSelector extends LitElement {
  static get is() {
    return 'product-selector';
  }

  // Declare properties
  static get properties() {
    return {
      name: { type: String, },
      active: { type: Boolean },
      items: { type: Array },
      selected: { type: Number },
      type:{ type: String },
      _iterador: { type: Number, state: true }

    };
  }

  // Initialize properties
  constructor() {
    super();
    this.name = 'BBVA';
    this.items = [];
    this.type = "card"//acount
    this.active = false;
    this.selected = 0;
    this._iterador = 0;
    
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('product-selector-shared-styles')
    ];
  }

  // Define a template
  //<data-manager @apiData="${this._handlerApiData}" url="https://mock-senda-node.herokuapp.com/financial-overview/v0/financial-overview?contracts.productType=ACCOUNTS" metodo="GET"></data-manager>
  render() {
    return html`
      <slot></slot>
      <p>Welcome to ${this.name}</p>      

      ${this.items.map(listCurrency =>
        html`
          <h4>${listCurrency.currency}</h4>
          ${listCurrency.products.map(lista => 
            html` 
              <section class="flex-section">
                <div class="flex" style="width:15%">
                  <input type="radio" id="${lista.printedNumber}" name="productos" value="${lista.printedNumber}"
                     .checked="${this._handlerIterador(lista.printedNumber, lista.balance)}" 
                     @click="${() => this._handlerClick(lista.printedNumber, lista.balance)}">
                  ${this.type === "card" ? html`<img src="../demo/icono.png">` : html``}
                </div>
                <div style="width:85%">
                  <div class="flex">
                    <p class="${this.active ? `text-black` : ``}">${lista.printedNumber}</p>
                    <p class="${this.active ? `text-black` : ``}">${lista.balance} ${listCurrency.currency}</p>          
                  </div>
                  <div class="flex">
                    <p>${lista.alias}</p>
                    <p>Saldo disponible</p> 
                  </div>
                </div>  
              </section>
            `
          )}  
        `
      )}
    `;
  }

  _handlerClick(numeroCta, balance){ 
    var incremento = 0;

    for(var i = 0; i < this.items.length; i++){
      for(var j = 0; j < this.items[i].products.length; j++ ){        
        if(this.items[i].products[j].printedNumber == numeroCta){
          this.selected = incremento;
          this._iterador = 0;
        }
        incremento++;
      }
    }

    var resultado = {
      numeroCta, balance
    }
    
    /* const instanciaDataManager = new DataManager({host: 'https://mock-senda-node.herokuapp.com'});
    instanciaDataManager.obtenerCuentas().then(resultado => {
      console.log("result ", resultado)
    }).catch(error => console.log(error)) */
    
    this.dispatchEvent(
      new CustomEvent('item-selected',{
        composed: true,
        bubbles: true,
        detail: resultado
    }))
  }

  _handlerIterador(numeroCta, balance){
    if(this.selected === this._iterador){
      this._iterador += 1;
      this.active = true;
      return true
    }
    else if(this._iterador < this.selected){
      this._iterador += 1;
      this.active = false;
      return false
    }
    else{
      this.active = false;
      return false
    }
  }

  clearCurrentSelection(){
    console.log("hola desde el component")
    this.selected = -1;
    this._iterador = 0;
  }

  /* _handlerApiData(e) {
    let nuevoArreglo = [];
    let productos = []
    console.log('Datos: ', e.detail.datos.data);  
    
    (e.detail.datos.data.contracts).map((contract) => {
      productos.push({
        alias: contract.alias,
        id: contract.id,
        printedNumber: contract.number,
        balance: contract.detail.specificAmounts[0].amounts[0].amount
      })
    })

    nuevoArreglo.push({
      currency: 'MXN',
      products : productos
    })
    console.log("newArray ", nuevoArreglo)
  } */
  
}
