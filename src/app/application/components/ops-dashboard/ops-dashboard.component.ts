import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';
import {NbColorHelper, NbThemeService} from '@nebular/theme';


@Component({
  selector: 'ngx-ops-dashboard',
  templateUrl: './ops-dashboard.component.html',
  styleUrls: ['./ops-dashboard.component.scss'],
})
export class OpsDashboardComponent implements OnInit {
  chartData = new BehaviorSubject({});
  application = [
    {
      title: 'Ping',
      icon: 'keypad-outline',
      link: '/application/ping',
      bg: '#2ce69b',
    },
    {
      title: 'Traceroute',
      icon: 'flip-outline',
      link: '/application/traceroute',
      bg: '#42aaff',
    },
    {
      title: 'MTR',
      icon: 'share-outline',
      link: '/application/mtr',
      bg: '#ffc94d',
    },
  ];

  constructor(private theme: NbThemeService) {
  }

  ngOnInit() {
    this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      this.chartData.next({
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            data: [65, 59, 80, 81, 56, 55, 40],
            label: 'Series A',
            backgroundColor: NbColorHelper.hexToRgbA(colors.primary, 0.3),
            borderColor: colors.primary,
          }, {
            data: [28, 48, 40, 19, 86, 27, 90],
            label: 'Series B',
            backgroundColor: NbColorHelper.hexToRgbA(colors.danger, 0.3),
            borderColor: colors.danger,
          }, {
            data: [18, 48, 77, 9, 100, 27, 40],
            label: 'Series C',
            backgroundColor: NbColorHelper.hexToRgbA(colors.info, 0.3),
            borderColor: colors.info,
          },
          ],
        },
      });
    });
  }

}
