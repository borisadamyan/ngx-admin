import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {PingService} from '../../services/ping.service';

@Component({
  selector: 'ngx-ops-ping',
  templateUrl: './ops-ping.component.html',
  styleUrls: ['./ops-ping.component.scss'],
})
export class OpsPingComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;
  pingResList = [];
  pingInterval;
  lockbtn = false;
  pingSubscription;
  currentTheme: string;


  constructor(private pingService: PingService) {
  }

  ngOnInit() {
  }

  pingSite(data?) {
    this.pingSubscription = this.pingService.ping(data).subscribe(users => {
      // console.log(users);
      users['ping'].map(each => {
        this.pingResList.push(each);
      });

    });
  }


  onSubmit(f) {
    console.log(f.value);
    this.lockbtn = true;
    this.pingResList = [];
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
    } catch (err) {
    }
  }

}
