import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {NotFoundComponent} from "../pages/miscellaneous/not-found/not-found.component";
import {DashboardComponent} from "../pages/dashboard/dashboard.component";
import {OpsDashboardComponent} from "./components/ops-dashboard/ops-dashboard.component";
import {OpsPingComponent} from "./components/ops-ping/ops-ping.component";

const routes: Routes = [{
    path: '',
    component: MainPageComponent,
    children: [
        {
            path: 'dashboard',
            component: OpsDashboardComponent,
        },
        {
            path: 'ping',
            component: OpsPingComponent,
        },
        // {
        //   path: 'layout',
        //   loadChildren: () => import('./layout/layout.module')
        //       .then(m => m.LayoutModule),
        // },
        {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
        },
        {
            path: '**',
            component: NotFoundComponent,
        },
    ],
}];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ApplicationRoutingModule {
}
