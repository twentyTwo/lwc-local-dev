import { LightningElement } from 'lwc';

export default class Help extends LightningElement {
  
  
  data = 'test';

  logData() {

      var h1 = this.template.querySelector('h1');
      var h1Text = h1.textContent;
      console.log('Data passed from parent is' + this.data);
      console.log(h1Text);


  }


   constructor() {
    super();
    console.log('constructor of parent at ' + new Date().getSeconds());
    // this.logData();
    
   }

    connectedCallback() {
        console.log('connectedCallback of parent at ' + new Date().getSeconds());
      //  this.logData();
      this.data = {
        "test":"testing"
      };
        
    }

    renderedCallback() {      
        console.log('renderedCallback of parent at ' + new Date().getSeconds());
        this.logData();
    }

    disconnectedCallback() {
        console.log('disconnectedCallback of parent at ' + new Date().getSeconds());
        this.logData();
    }

    errorCallback(error, stack) {
        console.log('errorCallback of parent at ' + new Date().getSeconds());

    }

}
