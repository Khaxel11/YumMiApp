import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Gesture, GestureController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements AfterViewInit {
  @ViewChild('container') containerRef: ElementRef;
  @ViewChild('containerMinutes') containerMinutes: ElementRef;
  @ViewChild('containerTime') containerTime: ElementRef;
  @Output() selectedHourChange = new EventEmitter<any>();
  @Output() selectedMinChange = new EventEmitter<any>();
  @Output() selectedTimeChange = new EventEmitter<any>();
  @Input() Hour : string;
  selectedHour: number = 12; 
  selectedMin : number = 0;
  selectedTime : string = "a. m."
  hours: number[] = Array.from({ length: 12 }, (_, i) => (i === 0) ? 12 : i); 
  min: number[] = Array.from({ length: 59 }, (_, i) => (i === 0) ? 59 : i); 
  time : string[] = ["a. m.", "p. m."];
  gesture: Gesture;
  updatingTime: boolean = false; 
  updatingTimeMin: boolean = false;
  isHour : boolean = false;
  isMin : boolean = false;
  isTime : boolean = false;
  updatingTimeTime : boolean = false;
  constructor(private gestureCtrl: GestureController, private cdr: ChangeDetectorRef) { }
  getHora() {
    const Time = new Date(this.Hour);
    this.selectedHour = Time.getHours() % 12 || 12; // Convertir a formato de 12 horas
    this.selectedMin = Time.getMinutes();
    this.selectedTime = Time.getHours() >= 12 ? 'p. m.' : 'a. m.'; // Determinar si es AM o PM
  }
  ngAfterViewInit() {
    this.getHora();
    

    this.setupGestures();
    this.setupGesturesMin();
    this.setupGesturesTime();
  }
  emitSelectedHour(): void {
    this.selectedHourChange.emit(this.selectedHour);
  }
  emitSelectedTime(): any {
    this.selectedTimeChange.emit(this.selectedTime);
  }

  // Método para emitir el valor de selectedMin
  emitSelectedMin(): void {
    this.selectedMinChange.emit(this.selectedMin);
  }
  setupGesturesTime() {
    this.gesture = this.gestureCtrl.create({
      el: this.containerTime.nativeElement,
      gestureName: 'pan',
      direction: 'y',
      onStart: ev => this.onPanStartTime(ev),
      onMove: ev => this.onPanMoveTime(ev),
      onEnd: ev => this.onPanEndTime(ev)
    });
    this.gesture.enable(true);
  }


  setupGestures() {
    this.gesture = this.gestureCtrl.create({
      el: this.containerRef.nativeElement,
      gestureName: 'pan',
      direction: 'y',
      onStart: ev => this.onPanStart(ev),
      onMove: ev => this.onPanMove(ev),
      onEnd: ev => this.onPanEnd(ev)
    });
    this.gesture.enable(true);
  }
  setupGesturesMin() {
    this.gesture = this.gestureCtrl.create({
      el: this.containerMinutes.nativeElement,
      gestureName: 'pan',
      direction: 'y',
      onStart: ev => this.onPanStartMin(ev),
      onMove: ev => this.onPanMoveMin(ev),
      onEnd : ev => this.onPanEndMin(ev)
    });
    this.gesture.enable(true);
  }
  onPanStartMin(event: any) {
    this.isMin = true;
    this.cdr.detectChanges();
  }
  onPanStartTime(event: any) {
    this.isTime = true;
    this.cdr.detectChanges();
  }
  onPanStart(event: any) {
    this.isHour = true;
    this.cdr.detectChanges();
  }
  onPanTime(event: any) {
    this.isHour = true;
    this.cdr.detectChanges();
  }
  onPanEnd(event: any) {
    this.isHour = false;
     
    this.cdr.detectChanges();
    
  }
  onPanEndMin(event: any) {
    this.isMin = false;
    
    this.cdr.detectChanges();
    this.emitSelectedMin();
  }
  onPanEndTime(event: any) {
    this.isTime = false;
    
    this.cdr.detectChanges();
    this.emitSelectedTime();
  }
  onPanMove(event: any) {
    const deltaY = event.deltaY;
    const step = 25; 

    if (!this.updatingTime) {
      this.updatingTime = true; 
      
      setTimeout(async() => {
        if (deltaY < 0) {
          this.selectedHour = (this.selectedHour === 12) ? 1 : this.selectedHour + 1;
        } else {
          this.selectedHour = (this.selectedHour === 1) ? 12 : this.selectedHour - 1;
        }
        
        this.updatingTime = false; 
        this.emitSelectedHour();
        await this.cdr.detectChanges(); 
      }, 300); 
    }
  }

  onPanMoveMin(event: any) {
    const deltaY = event.deltaY;
    const step = 25; 
    if (!this.updatingTimeMin) {
      this.updatingTimeMin = true; 
      setTimeout(() => {
        if (deltaY < 0) {
          this.selectedMin = (this.selectedMin === 59) ? 0 : this.selectedMin + 1;
        } else {
          this.selectedMin = (this.selectedMin === 0) ? 59 : this.selectedMin - 1;
        }
        this.cdr.detectChanges(); 
        this.updatingTimeMin = false; 
        this.emitSelectedMin();
      }, 300);
    }
  }
  onPanMoveTime(event: any) {
    const deltaY = event.deltaY;
    const step = 25; 

    if (!this.updatingTimeTime) {
      this.updatingTimeTime = true; 
      
      setTimeout(async() => {
        if (deltaY < 0) {
          
          this.selectedTime = "p. m.";
        } else {
          
          this.selectedTime = "a. m.";
        }
        
        this.updatingTimeTime = false; 
        await this.cdr.detectChanges(); 
        this.emitSelectedTime();
      }, 300); 
    }
  }
  updateScrollPosition() {
    const container = this.containerRef.nativeElement;
    const itemHeight = 50; 

    container.scrollTop = (this.selectedHour - 1) * itemHeight; 
  }

  getPreviousHour(): number {
    const previousHour = (this.selectedHour === 1) ? 12 : this.selectedHour - 1;
    return previousHour;
  }
  getPreviousTime(): number {
    const previousHour = (this.selectedHour === 1) ? 12 : this.selectedHour - 1;
    return previousHour;
  }
  getPreviousMin() : number{
    const previousMin = (this.selectedMin === 0) ? 59 : this.selectedMin - 1;
    return previousMin;
  }
  
  getNextHour(): number {
    const nextHour = (this.selectedHour === 12) ? 1 : this.selectedHour + 1;
    return nextHour;
  }
  getNextMin() : number{
    const nextMin = (this.selectedMin === 59) ? 0 : this.selectedMin + 1;
    return nextMin;
  }
  formatTime(value: number) {
    return value < 10 ? '0' + value : '' + value;
  }
}
