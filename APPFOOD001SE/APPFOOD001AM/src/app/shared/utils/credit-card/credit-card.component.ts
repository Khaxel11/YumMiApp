import { Component, OnInit } from '@angular/core';
import { KitchenService } from 'src/app/services/Kitchen/kitchen.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {

  ngOnInit(): void {
      this.getBancos();
  }
  currentCardBackground: number = Math.floor(Math.random() * 25 + 1);
  cardName: string = "";
  cardNumber: string = "";
  cardMonth: string = "";
  cardYear: string = "";
  cardCvv: string = "";
  cardCLABE : string = "";
  cardBankId : number = 0;
  minCardYear: number = new Date().getFullYear();
  amexCardMask: string = "#### ###### #####";
  otherCardMask: string = "#### #### #### ####";
  cardNumberTemp: string = "";
  isCardFlipped: boolean = false;
  focusElementStyle: { [key: string]: string } | null = null;
  isInputFocused: boolean = false;
  lstBanks = [];
  constructor(private service : KitchenService) {
    this.cardNumberTemp = this.otherCardMask;
    
    setTimeout(() => {
      const cardNumberInput = document.getElementById("cardNumber") as HTMLInputElement;
      if (cardNumberInput) {
        cardNumberInput.focus();
      }
    });
  }
  async getBancos() : Promise<any>{
    let data = await this.service.getInfo(10);
    if(data.data){
      this.lstBanks = data.data;
    }
  }

  formatCardNumberMask(cardNumber: string): string {
    const cleanedNumber = cardNumber.replace(/[^\d]/g, '');
  
    let formattedNumber = '';
    const cardType = this.getCardType();
  
    if (cardType === 'amex') {
      formattedNumber = cleanedNumber.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
    } else {
      formattedNumber = cleanedNumber.replace(/(\d{4})/g, '$1 ').trim();
    }
  
    return formattedNumber ? formattedNumber : this.generateCardNumberMask();
  }
  
  
formatCardName(cardName: string): string {
  return cardName.replace(/\s\s+/g, ' ');
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
  getBankName(){
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

  minCardMonth(): number {
    if (parseInt(this.cardYear) === this.minCardYear) return new Date().getMonth() + 1;
    return 1;
  }

  flipCard(status: boolean) {
    this.isCardFlipped = status;
  }

  focusInput(ref: string) {
    this.isInputFocused = true;
    const target = document.getElementById(ref);
    if (target) {
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      };
    }
  }

  blurInput() {
    setTimeout(() => {
      if (!this.isInputFocused) {
        this.focusElementStyle = null;
      }
    }, 300);
    this.isInputFocused = false;
  }

}
