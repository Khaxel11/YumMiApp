import { Component, Input, OnInit } from '@angular/core';
import { KitchenService } from 'src/app/services/Kitchen/kitchen.service';
@Component({
  selector: 'card-cs',
  templateUrl: './card-cs.component.html',
  styleUrls: ['./card-cs.component.scss']
})
export class CardCsComponent implements OnInit {
  @Input() currentCardBackground: number = Math.floor(Math.random() * 25 + 1);
  @Input() cardName: string = "";
  @Input() cardNumber: string = "";
  @Input() cardMonth: string = "";
  @Input() cardYear: string = "";
  @Input() cardCvv: string = "";
  @Input() cardCLABE: string = "";
  @Input() cardBankId: number = 0;
  @Input() isCardFlipped: boolean = false;
  @Input() encriptNumber : boolean = false;
  encriptedNumber : string = "Hola"
  minCardYear: number = new Date().getFullYear();
  amexCardMask: string = "#### ###### #####";
  otherCardMask: string = "#### #### #### ####";
  cardNumberTemp: string = "";
  
  focusElementStyle: { [key: string]: string } | null = null;
  isInputFocused: boolean = false;
  lstBanks = [];
  constructor(private service : KitchenService) { 
    this.getBanks();
  }

  ngOnInit(): void {
  }
  formatCardNumberMask(cardNumber: string): string {
    const cleanedNumber = cardNumber.replace(/[^\d]/g, '');

    let formattedNumber = '';
    const cardType = this.getCardType();

    if (cardType === 'amex') {
      formattedNumber = 
         cleanedNumber.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
    } else {
      formattedNumber = cleanedNumber.replace(/(\d{4})/g, '$1 ').trim();
    }

    if(this.encriptNumber){
      const splitedNumber = formattedNumber.split(' ');
      var newFormattedNumber = "";
      // console.log(splitedNumber);
      for (let index = 0; index < splitedNumber.length-1; index++) {
        let element = splitedNumber[index]
        for (let j = 0; j < element.length; j++) {
          newFormattedNumber += "*"
        }
        newFormattedNumber += " ";
        
      }
      if(newFormattedNumber){newFormattedNumber += splitedNumber[splitedNumber.length-1]}

      formattedNumber = newFormattedNumber;
    }

    return formattedNumber ? formattedNumber : this.generateCardNumberMask();
  }
  getCardType(): string {
    let number = this.cardNumber;
    let re = new RegExp("^4");
    if (number.match(re) != null) return "visa";

    re = new RegExp("^(34|37)");
    if (number.match(re) != null) return "amex";

    re = new RegExp("^5[1-5]");
    if (number.match(re) != null) return "mastercard";


    return "visa"; // default type
  }
  formatCardNumber(): void {
    const cleanedNumber = this.cardNumber.replace(/[^\d]/g, '');


    let formattedNumber = '';
    const cardType = this.getCardType();

    if (cardType === 'amex') {
      formattedNumber = cleanedNumber.replace(/(\d{4})(\d{6})(\d{5})/g, '$1 $2 $3').trim();


    } else {
      formattedNumber = cleanedNumber.replace(/(\d{4})/g, '$1 ').trim();
    }

    this.cardNumber = formattedNumber;
  }
  generateCardNumberMask(): string {
    return this.getCardType() === "amex" ? this.amexCardMask : this.otherCardMask;
  }
    
  formatCardName(cardName: string): string {
    return cardName.replace(/\s\s+/g, ' ');
  }

  getBankName() {
    const banco = this.lstBanks.find(banco => banco.IdBanco === this.cardBankId);
    if(banco){
      if(banco.IdBanco === 6){
        banco.NombreBanco = "Nu"
      }
      if(banco.IdBanco === 7){
        banco.NombreBanco = "amex"
      }
    }
    return banco ? banco.NombreBanco : null;
  }
  async getBanks(){
    let data = await this.service.getInfo(10);
    if(data.data){
      this.lstBanks = data.data;
    }
  }
}
