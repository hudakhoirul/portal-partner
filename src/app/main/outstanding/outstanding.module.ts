import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {OutstandingListComponent} from './outstanding-list/outstanding-list.component';
import {DxBulletModule, DxDataGridModule, DxTemplateModule, DxButtonModule, DxBoxModule, DxTabPanelModule, DxFormModule, DxRadioGroupModule} from 'devextreme-angular';
import {MatIconModule} from '@angular/material';

import { DraftComponent } from './draft/draft.component';
import { RegisterClaimFormComponent } from './outstanding-view/outstanding-view.component';
import { SharedComponentModule } from '../shared/shared-component.module';

const routes: Routes = [
    {
        path: ':path',
        component: DraftComponent
    },

];

@NgModule({
    declarations: [
        OutstandingListComponent,
        RegisterClaimFormComponent,
        DraftComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DxDataGridModule,
        DxTemplateModule,
        DxBulletModule,
        MatIconModule,
        DxButtonModule,
        DxBoxModule,
        DxTabPanelModule,
        DxFormModule,
        DxRadioGroupModule,
        SharedComponentModule
    ],
    exports: [
        RouterModule
    ]
})


export class OutstandingModule {
}
