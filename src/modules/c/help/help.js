import { LightningElement } from 'lwc';

export default class Help extends LightningElement {
    data;

    get testData() {
        if(this.data) return;
        
        setTimeout(() => {
            this.data = {
                "dataToBeProcessedInChild": {
                    "data": {
                        "assetClasses": [
                            {
                                "assetClass": "Stocks",
                                "assetClassValue": 1000
                            },
                            {
                                "assetClass": "Bonds",
                                "assetClassValue": 2000
                            }]
                    }
                }
            };
        }
        , 5000);

    }

}
