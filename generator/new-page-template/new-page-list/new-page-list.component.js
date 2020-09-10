module.exports = (names, params) => {
    return `
        import {Component, OnInit, ViewEncapsulation} from '@angular/core';
        import {fuseAnimations} from '@fuse/animations';
        import {${names.pascalCase}Service} from '@app/main/${names.kebabCase}/${names.kebabCase}.service';
        import {${names.pascalCase}DataInterface, ${names.pascalCase}Interface} from '@app/main/${names.kebabCase}/${names.kebabCase}.interface';
        import {Logger} from '@app/core';
        import {finalize} from 'rxjs/operators';
        import {Router} from '@angular/router';
        import {MatDialog, MatDialogRef} from '@angular/material';
        import {${names.pascalCase}FormComponent} from '@app/main/${names.kebabCase}/${names.kebabCase}-form/${names.kebabCase}-form.component';
        import {ToastrService} from 'ngx-toastr';

        const log = new Logger('${names.pascalCase}');

        @Component({
            selector: 'app-${names.kebabCase}-list',
            templateUrl: './${names.kebabCase}-list.component.html',
            styleUrls: ['./${names.kebabCase}-list.component.scss'],
            animations: fuseAnimations,
            encapsulation: ViewEncapsulation.None
        })
        export class ${names.pascalCase}ListComponent implements OnInit {

            isLoading: boolean;
            
            ${names.camelCase}: ${names.pascalCase}DataInterface[];
            cols: any[];
            config: CustomTableInterface = {
                button: [
                    {
                        buttonDetail : false,
                        hide: false,
                    },
                    {
                        buttonEdit : true,
                        hide: true,
                    },
                    {
                        buttonDelete : false,
                        hide: false,
                    },
                ]
            };

            dialogRef: MatDialogRef<${names.pascalCase}FormComponent>;

            constructor(private ${names.camelCase}Service: ${names.pascalCase}Service,
                        private router: Router,
                        private dialog: MatDialog,
                        private toastr: ToastrService) {
            }

            ngOnInit(): void {
                this.cols = [
                    {field: '${names.camelCase}', header: 'Container Type', width: '33%'},
                    {field: 'containerDesc', header: 'Container Description', width: '33%'},
                    {field: 'size', header: 'Size', width: '33%'},
                ];

                this.${names.camelCase} = [{
                    ${names.camelCase}: 'C2',
                    containerDesc: 'CONTAINER 20 FT',
                    size: 25,
                }, {
                    ${names.camelCase}: 'D4',
                    containerDesc: 'DYNA 4 TIRE',
                    size: 10,
                }, {
                    ${names.camelCase}: 'D6',
                    containerDesc: 'DYNA 6 TIRE',
                    size: 12,
                }];
            }

            // get${names.pascalCase}List(): void {
            //     this.isLoading = true;
            //     this.${names.camelCase}Service.get${names.pascalCase}List().pipe(
            //         finalize(() => this.isLoading = false)
            //     ).subscribe((res: ${names.pascalCase}Interface) => {
            //         if (res.acknowledge) {
            //             this.${names.camelCase} = res.data;
            //         }
            //     }, err => log.debug(err));
            // }

            onEdit(e): void {
                console.log('onEdit clicked ', e);
                this.dialogRef = this.dialog.open(${names.pascalCase}FormComponent, {
                    height: 'auto',
                    maxHeight: '90vh',
                    width: '90rem',
                    disableClose: true
                });
                this.dialogRef.afterClosed().subscribe((res: any) => {
                    console.log('result from dialog ', res);
                });
            }

            addDialog(e): void {
                console.log('addDialog clicked ', e);
                this.dialogRef = this.dialog.open(${names.pascalCase}FormComponent, {
                    height: 'auto',
                    maxHeight: '90vh',
                    width: '90rem',
                    disableClose: true
                });
                this.dialogRef.afterClosed().subscribe((res: any) => {
                    console.log('result from dialog ', res);
                });
            }

        }
    `;
};
