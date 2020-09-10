import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import {ClaimInquiryRoutingModule} from './claim-inquiry-routing.module';
import {ClaimInquiryListComponent} from './claim-inquiry-list/claim-inquiry-list.component';
import {ClaimInquiryService} from './claim-inquiry.service';
import {
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule
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
    DxValidatorModule,
    DxValidationSummaryModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxGalleryModule,
    DxFileUploaderModule,
    DxPopupModule
} from 'devextreme-angular';
import { SharedComponentModule } from '../shared/shared-component.module';
import { AnimatedButtonModule } from '@app/_components/animated-button/button.module';
import { LoaderModule } from '@app/_components/loader/loader.module';
import { ClaimInquiryFormComponent } from './claim-inquiry-form/claim-inquiry-form.component';

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
    SharedComponentModule,
    AnimatedButtonModule,
    DxSelectBoxModule,
    LoaderModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxTextBoxModule,
    DxNumberBoxModule,
    DxGalleryModule,
    DxFileUploaderModule,
    DxPopupModule,
    DxButtonModule
];

@NgModule({
    declarations: [
        ClaimInquiryListComponent,
        ClaimInquiryFormComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        Modules,
        ClaimInquiryRoutingModule,
        TranslateModule
    ],
    providers: [
        ClaimInquiryService
    ],
    entryComponents: [
        ClaimInquiryListComponent,
        ClaimInquiryFormComponent
    ]
})
export class ClaimInquiryModule {
}
