import {Component, OnDestroy, OnInit} from '@angular/core';
import {TracerouteService} from "../../services/traceroute.service";

@Component({
  selector: 'ngx-ops-traceroute',
  templateUrl: './ops-traceroute.component.html',
  styleUrls: ['./ops-traceroute.component.scss']
})
export class OpsTracerouteComponent implements OnInit, OnDestroy {
  traceResList = [];
  traceSubscription;
  loader = false;
  loadingLargeGroup = false;
  routeTo = '';

  constructor(private tracerouteService: TracerouteService) {
  }

  ngOnInit() {
  }

  onSubmit(f) {
    this.traceResList = [];
    this.traceSite(f.value);
    this.routeTo = f.value['url-trace'];
    setTimeout(() => {
      f.reset();
    }, 100);
  }

  traceSite(data) {
    this.loadingLargeGroup = true;
    this.traceSubscription = this.tracerouteService.trace(data).subscribe(users => {
      console.log(users);
      const result: any = users;
      result.forEach(each => {
        this.traceResList.push(each);
      });
      this.loadingLargeGroup = false;
    });
  }

  ngOnDestroy() {
    this.traceSubscription ? this.traceSubscription.unsubscribe() : '';
  }
}
