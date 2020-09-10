import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent } from './dashboard/dashboard.component';
import {DashboardService } from './dashboard.service';
import {
    MatIconModule,
} from '@angular/material';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { CoreModule, AuthenticationService } from '@app/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxTemplateModule, DxBoxModule, DxFormModule,DxResponsiveBoxModule } from 'devextreme-angular';
import { ButtonModule } from '@app/_components/button/button.module';
import { CardModule } from '@app/_components/card/card.module';
import { TranslateModule } from '@ngx-translate/core';

const Modules = [
    MatIconModule,
    PaginatorModule,
    FuseSharedModule,
    FuseWidgetModule,
    TableModule,
    InputTextModule,
    SweetAlert2Module.forRoot(),
    DxTemplateModule,
    DxButtonModule,
    DxBoxModule,
    DxFormModule,
    DxResponsiveBoxModule,
];

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        CoreModule,
        Modules,
        DashboardRoutingModule,
        ButtonModule,
        CardModule,
        TranslateModule
    ],
    providers: [
        DashboardService
    ],
    entryComponents: [
    ]
})
export class DashboardModule {
}
