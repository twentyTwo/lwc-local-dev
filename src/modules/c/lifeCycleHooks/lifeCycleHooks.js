import { LightningElement, api } from 'lwc';

export default class Help extends LightningElement {

  @api testData;
  
  logData() {

      console.log('----------Child Start-----------------');
      var h1 = this.template.querySelector('h1');
      var h1Text = h1.textContent;
      console.log(h1Text);

      console.log('Data passed to child is ' + this.testData);

      console.log('----------Child End-----------------');


  }


   constructor() {
    super();
    console.log('constructor at ' + new Date().getSeconds());
    console.log('Data passed to child is ' + this.testData);
    
   }

    connectedCallback() {
        console.log('connectedCallback at ' + new Date().getSeconds());
        console.log('Data passed to child is ' + this.testData);
    }

    renderedCallback() {      
        console.log('renderedCallback at ' + new Date().getSeconds());
        this.logData();
    }

    disconnectedCallback() {
        console.log('disconnectedCallback at ' + new Date().getSeconds());
        this.logData();
    }

    errorCallback(error, stack) {
        console.log('errorCallback at ' + new Date().getSeconds());
        console.log('Data passed to child is ' + this.testData);

    }

}
