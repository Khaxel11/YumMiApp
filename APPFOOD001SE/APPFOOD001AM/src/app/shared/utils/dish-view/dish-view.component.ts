import { Component, Input, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'dish-view',
  templateUrl: './dish-view.component.html',
  styleUrls: ['./dish-view.component.css']
})
export class DishViewComponent implements OnInit {
  @Input() Picture : string;
  @Input() Name : string;
  @Input() Description : string;
  constructor() { }

  ngOnInit(): void {
  }
  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return imageUrl;
  }
}
