import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PingService} from '../../services/ping.service';
import {BehaviorSubject} from "rxjs/Rx";
import {NbColorHelper, NbThemeService} from "@nebular/theme";
import * as moment from 'moment';

@Component({
  selector: 'ngx-ops-ping',
  templateUrl: './ops-ping.component.html',
  styleUrls: ['./ops-ping.component.scss'],
})
export class OpsPingComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;
  pingResList = [];
  pingInterval;
  lockbtn = false;
  pingSubscription;
  currentTheme: string;
  chartData = new BehaviorSubject({});
  colors;
  labels = [];
  data = [];
  lastTime = 0;
  less = false;


  constructor(private pingService: PingService,
              private theme: NbThemeService) {
  }

  ngOnInit() {
    this.theme.getJsTheme().subscribe(config => {
      this.colors = config.variables;
    });
  }

  pingSite(data?) {
    this.pingSubscription = this.pingService.ping(data).subscribe(users => {
      console.log(users);
      console.log(users['ping']);
      const time = users['ping'][1][2].split('=');
      let line = {
        ip: users['ping'][0],
        ismp: users['ping'][1][0].split('='),
        tll: users['ping'][1][1].split('='),
        time: time[1],
      };
      if (this.lastTime > time[1]) {
        this.less = true;
        console.log('less');
        line['class'] = 'green';
        line['icon'] = 'arrow-up';
      } else {
        this.less = false;
        line['class'] = 'red';
        line['icon'] = 'arrow-down';
      }
      this.lastTime = time[1];
      this.pingResList.push(line);
      this.data.push(users['value']);
      this.labels.push(moment(+users['time'] * 1000));
      this.chartData.next({
        data: {
          labels: this.labels,
          datasets: [{
            data: this.data,
            label: 'Ping Time',
            backgroundColor: NbColorHelper.hexToRgbA(this.colors.primary, 0.3),
            borderColor: this.colors.primary,
          },
          ],
        },
      });
    });

  }

  onSubmit(f) {
    console.log(f.value);
    this.lockbtn = true;
    this.pingResList = [];
    this.data = [];
    this.pingInterval = setInterval(() => {
      this.pingSite(f.value);
    }, 1000);
  }

  stopAction() {
    clearInterval(this.pingInterval);
    this.lockbtn = false;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch
      (err) {
    }
  }

  ngOnDestroy() {
    this.pingSubscription ? this.pingSubscription.unsubscribe() : '';
    clearInterval(this.pingInterval);
    this.lockbtn = false;
  }
}
