module.exports = (names, params) => {
    return `
        import {Component, OnInit} from '@angular/core';
        import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
        import * as moment from 'moment';
        import {AuthenticationService, Logger} from '@app/core';
        import {${names.pascalCase}Service} from '@app/main/${names.kebabCase}/${names.kebabCase}.service';
        import {ToastrService} from 'ngx-toastr';
        import {MatDialogRef} from '@angular/material';
        import {finalize} from 'rxjs/operators';

        const log = new Logger('${names.pascalCase} Form');

        @Component({
            selector: 'app-${names.kebabCase}-form',
            templateUrl: './${names.kebabCase}-form.component.html',
            styleUrls: ['./${names.kebabCase}-form.component.scss']
        })
        export class ${names.pascalCase}FormComponent implements OnInit {

            isLoading = false;
            showDetailForm = false;
            ${names.camelCase}Form: FormGroup;
            dataSourceCategory: any[];

            constructor(private auth: AuthenticationService,
                        private formBuilder: FormBuilder,
                        private ${names.camelCase}Service: ${names.pascalCase}Service,
                        private toastr: ToastrService,
                        public dialogRef: MatDialogRef<${names.pascalCase}FormComponent>) {
            }

            ngOnInit(): void {
                this.create${names.pascalCase}Form();
            }

            // add${names.pascalCase}(): void {
            //     if (this.${names.camelCase}Form.valid) {
            //         this.isLoading = true;
            //         this.${names.camelCase}Service.post${names.pascalCase}(this.${names.camelCase}Form.getRawValue()).pipe(
            //             finalize(() => this.isLoading = false)
            //         ).subscribe((res: any) => {
            //             this.dialogRef.close(res);
            //         }, err => log.debug(err));
            //     } else {
            //         this.toastr.error('Sorry, form not valid');
            //     }
            // }

            private create${names.pascalCase}Form(): void {
                this.${names.camelCase}Form = this.formBuilder.group({
                    '${names.camelCase}': new FormControl({value: '', disabled: false}, []),
                    'containerDesc': new FormControl({value: '', disabled: false}, []),
                    'size': new FormControl({value: '', disabled: false}, []),
                });
            }

            submit${names.pascalCase}(): void {
                console.log('submit${names.pascalCase} clicked');
                if (this.${names.camelCase}Form.valid) {
                    console.log('${names.camelCase}Form value ', this.${names.camelCase}Form.getRawValue());
                }
                this.dialogRef.close('looking for responses?');
            }

        }
    `;
};
