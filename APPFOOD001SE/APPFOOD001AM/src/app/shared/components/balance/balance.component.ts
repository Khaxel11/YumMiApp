import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.createChart(); 

  }
  createChart() {
    var ctx = document.getElementById('investmentChart') as HTMLCanvasElement;
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: [21, 45, 12, 9],
          backgroundColor: [
            'purple',
            'green',
            'blue',
            'yellow'
          ]
        }],
        labels: ['21%', '45%', '12%', '9%']
      },
      options: {
        // responsive: true,
        // maintainAspectRatio: false,
      }
    });
  }
}
