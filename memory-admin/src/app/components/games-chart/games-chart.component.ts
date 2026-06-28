import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayStats } from '../../models/admin.model';
import * as Highcharts from 'highcharts';

/**
 * GamesChartComponent displays games played over time using HighCharts
 * Shows trends of gameplay activity across days
 */
@Component({
  selector: 'app-games-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games-chart.component.html',
  styleUrl: './games-chart.component.scss'
})
export class GamesChartComponent implements OnInit {
  @Input() data: DayStats = {};
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  ngOnInit(): void {
    this.initializeChart();
  }

  ngOnChanges(): void {
    if (this.data && Object.keys(this.data).length > 0) {
      this.initializeChart();
    }
  }

  /**
   * Initialize HighCharts line chart for games over time
   */
  private initializeChart(): void {
    // Convert object to array and sort by date
    const entries = Object.entries(this.data)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const categories = entries.map(d => {
      const date = new Date(d.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    const values = entries.map(d => d.count);

    this.chartOptions = {
      chart: {
        type: 'line',
        style: {
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
        }
      },
      title: {
        text: 'Games Played per Day',
        style: {
          fontSize: '16px',
          fontWeight: '600',
          color: '#333'
        }
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Number of Games'
        },
        min: 0
      },
      tooltip: {
        shared: true,
        valueSuffix: ' games',
        style: {
          fontSize: '13px'
        }
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false
          },
          enableMouseTracking: true
        },
        series: {
          cursor: 'pointer'
        }
      },
      series: [
        {
          name: 'Games Played',
          data: values,
          color: '#667eea',
          lineWidth: 3,
          marker: {
            enabled: true,
            radius: 5,
            fillColor: '#667eea',
            lineWidth: 2,
            lineColor: '#fff'
          }
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
