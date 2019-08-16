import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MiscellaneousModule} from "../pages/miscellaneous/miscellaneous.module";
import {ECommerceModule} from "../pages/e-commerce/e-commerce.module";
import {DashboardModule} from "../pages/dashboard/dashboard.module";
import {
  NbCardModule, NbInputModule, NbMenuModule, NbButtonModule, NbIconModule, NbListModule,
  NbSpinnerModule
} from "@nebular/theme";
import {ThemeModule} from "../@theme/theme.module";
import {ApplicationRoutingModule} from "./application-routing.module";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {OpsDashboardComponent} from './components/ops-dashboard/ops-dashboard.component';
import {OpsChartjsLineComponent} from './components/charts/ops-chartjs-line/ops-chartjs-line.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {ChartModule} from "angular2-chartjs";
import {OpsPingComponent} from './components/ops-ping/ops-ping.component';
import {FormsModule} from "@angular/forms";
import {OpsTimeChartComponent} from './components/ops-ping/ops-time-chart/ops-time-chart.component';
import {NgxEchartsModule} from "ngx-echarts";
import {OpsTracerouteComponent} from './components/ops-traceroute/ops-traceroute.component';

@NgModule({
  declarations: [
    MainPageComponent,
    OpsDashboardComponent,
    OpsChartjsLineComponent,
    OpsPingComponent,
    OpsTimeChartComponent,
    OpsTracerouteComponent,
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NgxChartsModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    ChartModule,
    FormsModule,
    NbIconModule,
    NbListModule,
    NbSpinnerModule,
    NgxEchartsModule,
  ],
})
export class ApplicationModule {
}
