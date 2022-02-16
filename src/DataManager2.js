import { LitElement } from "lit-element";


export class DataManager extends LitElement {
    static get is() {
        return 'data-manager';
      }

    static get properties() {
        return {
            url: { type: String },
            metodo: { type: String }
        }
    }
    
    firstUpdated() {
        this.getDatos();
        console.log("Hola desde dataManager", this.getDatos());
    }
    /* constructor() {
        super();
        console.log("Hola desde dataManager", this.getDatos());
        
    } */

    _enviarDatos(datos) {
        this.dispatchEvent( new CustomEvent('apiData', {
            composed: true,
            bubbles: true,
            detail: { datos }
        }));
    }

    getDatos() {
        fetch(this.url, { method: this.metodo})
        .then((response) => {
            if(response.ok) { return response.json() }
            else { return Promise.reject(response) }
        })
        .then((datos) => { this._enviarDatos(datos) })
        .catch((error) => { console.warn('Fallo ', error) })
    }

}