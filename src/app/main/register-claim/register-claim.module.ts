import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {RegisterClaimRoutingModule} from './register-claim-routing.module';
import {RegisterClaimFormComponent} from './register-claim-form/register-claim-form.component';
import {RegisterClaimService} from './register-claim.service';
import {
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatStepperModule,
    MatButtonModule
} from '@angular/material';
import {CoreModule, AuthenticationService} from '@app/core';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseWidgetModule} from '@fuse/components';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';

import { DxDataGridModule,
    DxBulletModule,
    DxTemplateModule, 
    DxButtonModule,
    DxBoxModule,
    DxFormModule,
    DxTextAreaModule,
    DxTabPanelModule,
    DxRadioGroupModule,
    DxSelectBoxModule,
    DxFileUploaderModule,
    DxPopupModule,
    DxGalleryModule,
    DxNumberBoxModule,
    DxTextBoxModule,
} from 'devextreme-angular';
import { AnimatedButtonModule } from '@app/_components/animated-button/button.module';
import { SharedComponentModule } from '../shared/shared-component.module';
import { LoaderModule } from '@app/_components/loader/loader.module';
import { ClaimInformationFormComponent } from '../claim-inquiry/claim-information-form/claim-information-form.component';

const Modules = [
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    FuseSharedModule,
    FuseWidgetModule,
    SweetAlert2Module.forRoot(),
    DxDataGridModule,
    DxTemplateModule,
    DxBulletModule,
    DxButtonModule,
    DxBoxModule,
    DxFormModule,
    DxTextAreaModule,
    DxTabPanelModule,
    DxRadioGroupModule,
    MatDialogModule,
    MatStepperModule,
    MatButtonModule,
    DxSelectBoxModule,
    DxFileUploaderModule,
    DxPopupModule,
    DxGalleryModule,
    AnimatedButtonModule,
    SharedComponentModule,
    LoaderModule,
    DxNumberBoxModule,
    DxTextBoxModule
];

@NgModule({
    declarations: [
        RegisterClaimFormComponent,
        ClaimInformationFormComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        Modules,
        RegisterClaimRoutingModule,
        TranslateModule
    ],
    providers: [
        RegisterClaimService
    ],
    entryComponents: [
        RegisterClaimFormComponent
    ]
})
export class RegisterClaimModule {
}
