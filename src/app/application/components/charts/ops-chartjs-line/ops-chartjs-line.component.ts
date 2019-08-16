import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NbColorHelper, NbThemeService} from "@nebular/theme";
import * as moment from 'moment';

@Component({
  selector: 'ngx-ops-chartjs-line',
  templateUrl: './ops-chartjs-line.component.html',
  styleUrls: ['./ops-chartjs-line.component.scss'],
})
export class OpsChartjsLineComponent implements OnInit, OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;
  @Input() chartData;

  constructor(private theme: NbThemeService) {
  }

  ngOnInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      this.chartData.subscribe(data => {
        // console.log(data);
        this.data = data['data'];
      });
      // this.data = {
      //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      //   datasets: [{
      //     data: [65, 59, 80, 81, 56, 55, 40],
      //     label: 'Series A',
      //     backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
      //     borderColor: colors.primary,
      //   }, {
      //     data: [28, 48, 40, 19, 86, 27, 90],
      //     label: 'Series B',
      //     backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
      //     borderColor: colors.danger,
      //   }, {
      //     data: [18, 48, 77, 9, 100, 27, 40],
      //     label: 'Series C',
      //     backgroundColor: NbColorHelper.hexToRgbA(colors.info, 0.3),
      //     borderColor: colors.info,
      //   },
      //   ],
      // };
      this.options = {
        animation: {
          duration: 0,
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            'day': 'MMM DD',
            'week': 'MMM DD',
            'month': 'MMM DD',
          },
        },
        scaleLabel: {
          display: true,
        },
        ticks: {
          maxRotation: 45,
          fontSize: 9,
        },
        // categoryPercentage: 1.0,
        // barPercentage: 1.0
      }],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
