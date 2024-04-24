import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements AfterViewInit {
  @Input() public title = '';
  @ViewChild("expandWrapper", { read: ElementRef }) expandWrapper: ElementRef;
  @Input("expanded") expanded: boolean = false;
  @Input("expandHeight") expandHeight: string = "150px";

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    //Axel. displays  the content of the first item by default
    if (!this.expanded) {
      this.renderer.setStyle(this.expandWrapper.nativeElement, "max-height", "0px");
    } else {
      this.renderer.setStyle(this.expandWrapper.nativeElement, "max-height", this.expandHeight);
    }
  }

  toggleAccordion() {
    //Axel . adds a transition to make the accordion look
    this.expanded = !this.expanded;
    if (!this.expanded) {
      this.renderer.setStyle(this.expandWrapper.nativeElement, "max-height", "0px");
    } else {
      this.renderer.setStyle(this.expandWrapper.nativeElement, "max-height", this.expandHeight);
    }
  }
}
