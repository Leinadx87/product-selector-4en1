import { BGADPFinancialOverviewGetV0 } from '@cells-components/bgadp-financial-overview-v0';

export class GftFinancialOverviewService{
    constructor(config){
        this.config = config;
    }

    metodoPublico() {
        const response = this._getResponse(this._getInstanceFromBGADP());
        return response.then(data => data.data);
    }

    metodoPublico2() {
        const response = this._getResponse(this._getInstanceFromBGADP());
        return response.then(data => data.data.contracts);
    }

    async _getResponse(promise) {
        const result = await promise;
        return await JSON.parse(result.response);
    }
    
    async _getInstanceFromBGADP() {
        let dataProvider = new BGADPFinancialOverviewGetV0({
          host: this.config.host,
          requiresTsec: false
        });
        return await dataProvider.generateRequest();
    }
}

