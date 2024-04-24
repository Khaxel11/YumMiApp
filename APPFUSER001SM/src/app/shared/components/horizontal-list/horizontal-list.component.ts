import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { element } from 'protractor';

@Component({
  selector: 'horizontal-list',
  templateUrl: './horizontal-list.component.html',
  styleUrls: ['./horizontal-list.component.css']
})
export class HorizontalListComponent implements OnInit {

  @Input() options: any[] = [];
  @Output() itemSelected = new EventEmitter<any>(); 
  @Input() enabledOptions : boolean = false;
  @Input() action : boolean;
  
  selectedItem(option: any): void {

    option.selected = !option.selected;
    this.itemSelected.emit(option);
  }
  
  ngOnInit(): void {
      console.log(this.options);
      this.options.forEach(element => {
        element.selected = false;
      });
  }
  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return imageUrl;
  }
  selectedAdd(){

  }
  deleteItem(e : any){
    this.options = this.options.filter(item => item.id !== e.id);
      
      //this.cdr.detectChanges();
  }
  getItems() : any[]{
    return this.options;
  }
}
