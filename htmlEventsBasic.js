import { LightningElement, track } from 'lwc';
import send from '@salesforce/apex/WhatsAppMessageService.send';

export default class HtmlEventsBasic extends LightningElement {

    @track mobilenumber;
    @track message;
    @track currentResult;
    @track error; // to show error message from apex controller.
    @track success; // to show succes message in ui.
  
    onTextChange(event) {
      //Getting input field name
      const inputFieldName = event.target.name;
      if (inputFieldName === "mobilenumber") {
        //value of first text has changed, modifying the property value
        this.mobilenumber = event.target.value;
      } 
      else if(inputFieldName === "message") {
        //value of second text has changed, modifying the property value
        this.message = event.target.value;
      }
    }
    handleClick() {
        this.currentResult = this.mobilenumber + this.message;

        send( {mobileno: this.mobilenumber,
            message: this.message
        }).then(result => {
                this.success = result;
            })
            .catch(error => {
                this.error = error;
            });
        }
        get result() { 
            if(this.currentResult){
              return `Whatsapp message sent from ${this.mobilenumber} is ${this.message}`;
            }
            else{
                return '';
              }      
        }
}