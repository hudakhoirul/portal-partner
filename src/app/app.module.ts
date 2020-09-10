import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes} from '@angular/router';
import { MatMomentDateModule} from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule} from '@angular/material';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import 'hammerjs';
import {FuseModule} from '@fuse/fuse.module';
import {FuseSharedModule} from '@fuse/shared.module';
import {FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';
import {fuseConfig} from 'app/fuse-config';
import {AppComponent} from 'app/app.component';
import {AppStoreModule} from 'app/store/store.module';
import {LayoutModule} from 'app/layout/layout.module';
import {ToastrModule} from 'ngx-toastr';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { NotificationService } from './services/notification.service';
import { AuthenticationService } from './core';
import { CrudServiceModule } from './_shared/crud-service/crud-service.module';
import { TokenInterceptor } from './interceptor/token.interceptor';

const appRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: './main/dashboard/dashboard.module#DashboardModule',
    },
    {
        path: 'login',
        loadChildren: './main/login/login.module#LoginModule'
    },
    {
        path: 'register-claim',
        loadChildren: './main/register-claim/register-claim.module#RegisterClaimModule'
    },
    {
        path: 'outstanding',
        loadChildren: './main/outstanding/outstanding.module#OutstandingModule'
    },
    {
        path: 'claim-inquiry',
        loadChildren: './main/claim-inquiry/claim-inquiry.module#ClaimInquiryModule'
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        ToastrModule.forRoot(
            {
                closeButton: false,
                timeOut: 5000,
                positionClass: 'toast-bottom-right',
                preventDuplicates: false,
                extendedTimeOut: 1000,
            }
        ),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AppStoreModule,

        // crud service
        CrudServiceModule,
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        NotificationService,
        AuthenticationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {
}
