module.exports = function(names, params) {
    return `
        import {NgModule} from '@angular/core';
        import {CommonModule} from '@angular/common';

        import {${names.pascalCase}RoutingModule} from './${names.kebabCase}-routing.module';
        import {${names.pascalCase}ListComponent} from './${names.kebabCase}-list/${names.kebabCase}-list.component';
        import {${names.pascalCase}FormComponent} from './${names.kebabCase}-form/${names.kebabCase}-form.component';
        import {${names.pascalCase}Service} from './${names.kebabCase}.service';
        import {
            MatButtonModule,
            MatDialogModule,
            MatInputModule,
            MatFormFieldModule,
            MatIconModule,
            MatProgressSpinnerModule,
            MatSelectModule,
            MatSnackBarModule,
            MatChipsModule,
            MatExpansionModule,
            MatRippleModule,
            MatTabsModule,
            MatStepperModule,
            MatMenuModule
        } from '@angular/material';
        import {TableModule} from 'primeng/table';
        import {PaginatorModule} from 'primeng/paginator';
        import {InputTextModule} from 'primeng/inputtext';
        import {CoreModule, AuthenticationService} from '@app/core';
        import {FuseSharedModule} from '@fuse/shared.module';
        import {FuseWidgetModule} from '@fuse/components';
        import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
        import { SharedModule } from '@app/shared/shared.module';

        const Modules = [
            MatDialogModule,
            MatButtonModule,
            MatChipsModule,
            MatExpansionModule,
            MatFormFieldModule,
            MatIconModule,
            MatInputModule,
            MatRippleModule,
            MatSelectModule,
            MatSnackBarModule,
            MatTabsModule,
            MatStepperModule,
            MatMenuModule,
            MatProgressSpinnerModule,
            PaginatorModule,
            FuseSharedModule,
            FuseWidgetModule,
            TableModule,
            InputTextModule,
            SharedModule,
            SweetAlert2Module.forRoot()
        ];

        @NgModule({
            declarations: [
                ${names.pascalCase}ListComponent,
                ${names.pascalCase}FormComponent
            ],
            imports: [
                CommonModule,
                CoreModule,
                Modules,
                ${names.pascalCase}RoutingModule,
            ],
            providers: [
                ${names.pascalCase}Service
            ],
            entryComponents: [
                ${names.pascalCase}FormComponent
            ]
        })
        export class ${names.pascalCase}Module {
        }
    `
}