import {Component, OnInit, ViewChild} from '@angular/core';
import {MtrService} from '../../services/mtr.service';
import {LocalDataSource} from 'ng2-smart-table';
import {NbComponentStatus, NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-ops-mtr',
  templateUrl: './ops-mtr.component.html',
  styleUrls: ['./ops-mtr.component.scss'],
})
export class OpsMtrComponent implements OnInit {
  lockBtnMtr = false;
  loadingMTR = false;
  mtrResList = [];
  mtrInterval;
  mtrSubscription;
  count: number = 50;
  rows: any[] = [];
  active: boolean = true;
  temp: any[] = [];
  settings = {
    actions: false,
    hideSubHeader: true,
    columns: {
      hostname: {
        title: 'Hostname',
        type: 'string',
      },
      loss: {
        title: 'Loss',
        type: 'string',
      },
      snt: {
        title: 'Snt',
        type: 'string',
      },
      last: {
        title: 'Last',
        type: 'string',
      },
      avg: {
        title: 'Avg',
        type: 'string',
      },
      best: {
        title: 'Best',
        type: 'string',
      },
      wrst: {
        title: 'Wrst',
        type: 'string',
      },
      stdev: {
        title: 'Stdev',
        type: 'string',
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  @ViewChild('mydatatable', {static: false}) mydatatable: any;


  destroyByClick = true;
  duration = 2500;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbComponentStatus = 'success';
  title = 'MTR';
  content = `MTR is started`;

  statusStop: NbComponentStatus = 'danger';
  titleStop = 'MTR!';
  contentStop = `MTR now stopped`;

  constructor(private mtrService: MtrService, private toastrService: NbToastrService) {
  }

  ngOnInit() {
  }

  onSubmitMtr(f) {
    this.lockBtnMtr = true;
    this.loadingMTR = true;
    this.mtrResList = [];
    this.mtrInterval = setInterval(() => {
      this.mtrSite(f.value);
    }, 3000);
    this.makeToastOk();
  }

  mtrSite(data) {
    this.mtrSubscription = this.mtrService.mtr(data).subscribe(mtr => {
      const result: any = mtr['ping'];
      result.forEach(each => {
        this.rows = result.map(d => {
          d.updated = Date.now().toString();
          return d;
        });

        this.temp = [...this.rows];
        this.source.load(this.temp);
      });
      this.loadingMTR = false;
    });
  }

  stopActionMtr() {
    this.lockBtnMtr = false;
    clearInterval(this.mtrInterval);
    this.makeToastStop();
  }

  makeToastOk() {
    this.showToast(this.status, this.title, this.content);
  }

  makeToastStop() {
    this.showToast(this.statusStop, this.titleStop, this.contentStop);
  }

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };
    const titleContent = title ? `${title}` : '';

    this.toastrService.show(
      body,
      `${titleContent}`,
      config);
  }
}
