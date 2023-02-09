import { LightningElement } from 'lwc';

export default class Help extends LightningElement {
    
    toggleAccordion() {
    var accordionHeaders = document.getElementsByClassName("accordion-item-header");

    for (var i = 0; i < accordionHeaders.length; i++) {
      accordionHeaders[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var accordionContent = this.nextElementSibling;
        if (accordionContent.style.maxHeight) {
          accordionContent.style.maxHeight = null;
        } else {
          accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        } 
      });
    }
}

addEvent() {

document.querySelectorAll('h3').forEach(h3 => h3.addEventListener('click', function() {
    this.toggleAccordion();
    }));
}

renderedCallback() {
    this.addEvent();
}
    
    

}
