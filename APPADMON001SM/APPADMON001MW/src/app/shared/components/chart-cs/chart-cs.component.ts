import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chart-cs',
  templateUrl: './chart-cs.component.html',
  styleUrls: ['./chart-cs.component.css']
})
export class ChartCsComponent implements OnInit {
  ngOnInit(): void {
      
  }
  @Input() data: number[] = [];
  tooltip = { show: false, top: 0, left: 0, value: 0 };

  getColor(value: number): string {
    if (value >= 80) {
      return '#ff0000'; // Red for values >= 80
    } else if (value >= 60) {
      return '#ffa500'; // Orange for values >= 60
    } else if (value >= 40) {
      return '#ffff00'; // Yellow for values >= 40
    } else {
      return '#008000'; // Green for values < 40
    }
  }

  showTooltip(event: MouseEvent, value: number): void {
    this.tooltip.show = true;
    this.tooltip.value = value;
    this.tooltip.top = event.clientY + 10;
    this.tooltip.left = event.clientX + 10;
  }

  hideTooltip(): void {
    this.tooltip.show = false;
  }

  constructor() { }
}
