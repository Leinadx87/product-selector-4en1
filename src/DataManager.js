import { BGADP } from './Bgadp';

export class DataManager {

    

    constructor(configuracion){
        this.configuracion = configuracion;
    }

    async obtenerCuentas() {
        const instanciaDataManager = new BGADP(this.configuracion);
        
        const resultado = await instanciaDataManager.generateRequest();
        let nuevoArreglo = [];
        let productos = [];
        console.log('res ', resultado);

        (resultado.data.contracts).map((contract) => {
            productos.push({
            alias: contract.alias,
            balance: contract.detail.specificAmounts[0].amounts[0].amount,
            id: contract.id,
            printedNumber: contract.number
            })
        })
    
        nuevoArreglo.push({
            currency: 'MXN',
            products : productos
        })
        console.log("res 2 ", nuevoArreglo);

        return nuevoArreglo;
        /* instanciaDataManager.generateRequest().then(resultado => {
            // console.log("result ", resultado);
            console.log("newArray 1 ", this.nuevoArreglo);
            (resultado.data.contracts).map((contract) => {
                this.productos.push({
                alias: contract.alias,
                balance: contract.detail.specificAmounts[0].amounts[0].amount,
                id: contract.id,
                printedNumber: contract.number
                })
            })
        
            this.nuevoArreglo.push({
                currency: 'MXN',
                products : this.productos
            })
            console.log("newArray 2 ", this.nuevoArreglo);

            return this.nuevoArreglo;

        }).catch(error => console.log(error)) */
        
    }
    
}


    
    
