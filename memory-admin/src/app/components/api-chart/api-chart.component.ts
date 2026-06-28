import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiUsage } from '../../models/admin.model';
import * as Highcharts from 'highcharts';

/**
 * ApiChartComponent displays API usage statistics using HighCharts
 * Shows which APIs are most popular among players
 */
@Component({
  selector: 'app-api-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-chart.component.html',
  styleUrl: './api-chart.component.scss'
})
export class ApiChartComponent implements OnInit {
  @Input() data: ApiUsage[] = [];
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  ngOnInit(): void {
    this.initializeChart();
  }

  ngOnChanges(): void {
    if (this.data && this.data.length > 0) {
      this.initializeChart();
    }
  }

  /**
   * Initialize HighCharts pie chart for API usage
   */
  private initializeChart(): void {
    this.chartOptions = {
      chart: {
        type: 'pie',
        style: {
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        }
      },
      title: {
        text: 'API Usage Distribution',
        style: {
          fontSize: '16px',
          fontWeight: '600',
          color: '#333'
        }
      },
      tooltip: {
        pointFormat: '<b>{point.name}:</b> {point.y} games ({point.percentage:.1f}%)',
        style: {
          fontSize: '13px'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b><br/>{point.y} games',
            style: {
              fontSize: '11px',
              fontWeight: '500'
            }
          },
          colors: [
            '#667eea',
            '#764ba2',
            '#f093fb',
            '#f5576c',
            '#4facfe',
            '#00f2fe',
            '#43e97b',
            '#38f9d7',
            '#fa709a',
            '#fee140'
          ]
        }
      },
      series: [
        {
          name: 'Games Played',
          colorByPoint: true,
          data: this.data.map(api => ({
            name: api.name,
            y: api.count
          }))
        }
      ],
      credits: {
        enabled: false
      }
    };

    // Redraw chart if already rendered
    if (this.chartContainer) {
      setTimeout(() => {
        Highcharts.chart(this.chartContainer.nativeElement, this.chartOptions);
      }, 100);
    }
  }
}
