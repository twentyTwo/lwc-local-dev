import { LightningElement, api } from 'lwc';

export default class HelpChild extends LightningElement {
    toBeProcessedInChild;

    get process() {
        console.log('Inside processData getter and the time is: ', new Date().getSeconds());
        console.log(JSON.parse(JSON.stringify(this.dataToBeProcessedInChild)));
        console.log('---------------');
        return this.toBeProcessedInChild;
    }

    @api
    set process(value) {
        console.log('Inside processData setter and the time is: ', new Date().getSeconds());
        if(value)
        {
            console.log(JSON.parse(JSON.stringify(value)));
        }
        
        console.log('---------------');
        this.toBeProcessedInChild = value;
    }

    connectedCallback() {
        console.log('Inside connectedCallback() and the time is: ', new Date().getSeconds());
        if(this.toBeProcessedInChild){
            console.log(JSON.parse(JSON.stringify(this.toBeProcessedInChild)));
        }
        
        
        console.log('---------------');
    }

    renderedCallback() {
        console.log('Inside renderedCallback() and the time is: ', new Date().getSeconds());
        if(this.toBeProcessedInChild){
            console.log(JSON.parse(JSON.stringify(this.toBeProcessedInChild)));
        }
        
        console.log('---------------');
    }


}
