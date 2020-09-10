import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthenticationGuard} from '@app/core';
import { ClaimInquiryListComponent } from './claim-inquiry-list/claim-inquiry-list.component';
import { ClaimInquiryFormComponent } from './claim-inquiry-form/claim-inquiry-form.component';

const routes: Routes = [
    {
        path: '',
        component: ClaimInquiryListComponent,
        canActivate: [AuthenticationGuard]
    }, {
        path: ':id',
        component: ClaimInquiryFormComponent,
        canActivate: [AuthenticationGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClaimInquiryRoutingModule {
}
