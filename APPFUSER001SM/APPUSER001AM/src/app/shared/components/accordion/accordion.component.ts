<<<<<<< Updated upstream
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
=======
import { AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
>>>>>>> Stashed changes

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
<<<<<<< Updated upstream
export class AccordionComponent implements OnInit {
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

  toggleAccordion() {
    this.isOpen = !this.isOpen;
    this.toggle.emit();
  }
  constructor(){

  }
  ngOnInit(): void {
      
=======
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
>>>>>>> Stashed changes
  }
}
