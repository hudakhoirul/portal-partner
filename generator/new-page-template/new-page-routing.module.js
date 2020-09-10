module.exports = function(names, params) {
    return `
        import {NgModule} from '@angular/core';
        import {Routes, RouterModule} from '@angular/router';
        import {${names.pascalCase}ListComponent} from './${names.kebabCase}-list/${names.kebabCase}-list.component';
        import {AuthenticationGuard} from '@app/core';

        const routes: Routes = [
            {
                path: '',
                component: ${names.pascalCase}ListComponent,
                canActivate: [AuthenticationGuard]
            },
        ];

        @NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
        })
        export class ${names.pascalCase}RoutingModule {
        }
    `
};