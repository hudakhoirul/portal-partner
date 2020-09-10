import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {ListPolicyComponent} from './list-policy/list-policy.component';
import {
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatStepperModule,
    MatButtonModule
} from '@angular/material';
import {CoreModule} from '@app/core';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseWidgetModule} from '@fuse/components';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';

// import filepond module
import { FilePondModule, registerPlugin } from 'ngx-filepond';

// import and register filepond file type validation plugin
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// registerPlugin(FilePondPluginFileValidateType);

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
    DxLoadPanelModule
} from 'devextreme-angular';
import { AnimatedButtonModule } from '@app/_components/animated-button/button.module';
import { RegisterClaimService } from '../register-claim/register-claim.service';
import { ListClaimComponent } from './list-claim/list-claim.component';
import { FileDocumentComponent } from './file-document/file-document.component';
import { LoaderModule } from '@app/_components/loader/loader.module';
import { ActionButtonComponent } from './action-button/action-button.component';
import { FileDocumentNewComponent } from './file-document-new/file-document-new.component';
// import { FileSelectDirective } from 'ng2-file-upload';


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
    DxLoadPanelModule,
    AnimatedButtonModule,
    LoaderModule
];

@NgModule({
    declarations: [
        ListPolicyComponent,
        ListClaimComponent,
        FileDocumentComponent,
        FileDocumentNewComponent,
        ActionButtonComponent
        // FileSelectDirective
    ],
    imports: [
        CommonModule,
        CoreModule,
        Modules,
        FilePondModule,
        TranslateModule
    ],
    providers: [
        RegisterClaimService
    ],
    exports: [
        ListPolicyComponent,
        ListClaimComponent,
        FileDocumentComponent,
        FileDocumentNewComponent,
        ActionButtonComponent
    ]
})
export class SharedComponentModule {
}
