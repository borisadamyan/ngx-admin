import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MiscellaneousModule} from "../pages/miscellaneous/miscellaneous.module";
import {ECommerceModule} from "../pages/e-commerce/e-commerce.module";
import {DashboardModule} from "../pages/dashboard/dashboard.module";
import {NbMenuModule} from "@nebular/theme";
import {ThemeModule} from "../@theme/theme.module";
import {ApplicationRoutingModule} from "./application-routing.module";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {OpsDashboardComponent} from './components/ops-dashboard/ops-dashboard.component';
import {OpsChartjsLineComponent} from './components/charts/ops-chartjs-line/ops-chartjs-line.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {ChartModule} from "angular2-chartjs";

@NgModule({
    declarations: [
        MainPageComponent,
        OpsDashboardComponent,
        OpsChartjsLineComponent,
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
        ChartModule,
    ],
})
export class ApplicationModule {
}
