import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { RegisterClaimFormComponent } from './register-claim-form/register-claim-form.component';
import {AuthenticationGuard} from '@app/core';
import { ClaimInformationFormComponent } from '../claim-inquiry/claim-information-form/claim-information-form.component';

const routes: Routes = [
    {
        path: '',
        component: RegisterClaimFormComponent,
        canActivate: [AuthenticationGuard]
    }, {
        path: ':id',
        component: ClaimInformationFormComponent,
        canActivate: [AuthenticationGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegisterClaimRoutingModule {
}
