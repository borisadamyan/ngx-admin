import {Component, OnInit} from '@angular/core';
import {APP_MENU_ITEMS} from '../../application-menu';
import {NbSidebarService} from '@nebular/theme';
import {LayoutService} from '../../../@core/utils';

@Component({
  selector: 'ngx-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  menu = APP_MENU_ITEMS;

  constructor(private sidebarService: NbSidebarService,
              private layoutService: LayoutService) {
  }

  ngOnInit() {
  }
}
