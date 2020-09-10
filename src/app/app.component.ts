import { Component, Inject, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { TranslateService } from '@ngx-translate/core';
import {Subject, timer, forkJoin} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { navigation } from 'app/navigation/navigation';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
import { Router } from '@angular/router';
import { NotificationService } from './services/notification.service';
import { AuthenticationService } from './core';
import { Dashboard } from './_models/claim/dashboard';
import { DataService } from './_shared/crud-service/data.service';
import { ClaimPartner } from './_models/claim';
import notify from 'devextreme/ui/notify';
// import {MessagingService} from '@app/shared/messaging.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;
    message: any;
    expiredLogin = 1440; // 1 day
    private token: string;
    private timerSubscription: any;
    private postsSubscription: any;

    dataSource = [];
    card = [];
    listDataNotification = [];

    listDataRevision = 0;
    listDataWaiting = 0;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {DOCUMENT} document
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseSplashScreenService} _fuseSplashScreenService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     * @param {Platform} _platform
     * @param {TranslateService} _translateService
     */
    constructor(
        @Inject(DOCUMENT) private document: any,
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseSplashScreenService: FuseSplashScreenService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _translateService: TranslateService,
        private _platform: Platform,
        private router: Router,
        private notificationService: NotificationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private authenticationService: AuthenticationService,
        private _CD: ChangeDetectorRef,
        private _DS: DataService,
        // private messagingService: MessagingService
    ) {

        if (!this.authenticationService.getToken()) {
            localStorage.clear();
            this.authenticationService.signOut();
            this.router.navigate(['login']);
        }

        // Get default navigation
        this.navigation = navigation;

        // Register the navigation to the service
        this._fuseNavigationService.register('main', this.navigation);

        // Set the main navigation as our current navigation
        this._fuseNavigationService.setCurrentNavigation('main');

        // Add languages
        this._translateService.addLangs(['en', 'tr']);

        // Set the default language
        this._translateService.setDefaultLang('en');

        // Set the navigation translations
        this._fuseTranslationLoaderService.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this._translateService.use('id');

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix Start
         * ----------------------------------------------------------------------------------------------------
         */

        /**
         * If you are using a language other than the default one, i.e. Turkish in this case,
         * you may encounter an issue where some of the components are not actually being
         * translated when your app first initialized.
         *
         * This is related to ngxTranslate module and below there is a temporary fix while we
         * are moving the multi language implementation over to the Angular's core language
         * service.
         **/

        // Set the default language to 'en' and then back to 'tr'.
        // '.use' cannot be used here as ngxTranslate won't switch to a language that's already
        // been selected and there is no way to force it, so we overcome the issue by switching
        // the default language back and forth.
        /**
         setTimeout(() => {
            this._translateService.setDefaultLang('en');
            this._translateService.setDefaultLang('tr');
         });
         */

        /**
         * ----------------------------------------------------------------------------------------------------
         * ngxTranslate Fix End
         * ----------------------------------------------------------------------------------------------------
         */

        // Add is-mobile class to the body if the platform is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                this.fuseConfig = config;

                // Boxed
                if (this.fuseConfig.layout.width === 'boxed') {
                    this.document.body.classList.add('boxed');
                }
                else {
                    this.document.body.classList.remove('boxed');
                }

                // Color theme - Use normal for loop for IE11 compatibility
                for (let i = 0; i < this.document.body.classList.length; i++) {
                    const className = this.document.body.classList[i];

                    if (className.startsWith('theme-')) {
                        this.document.body.classList.remove(className);
                    }
                }

                this.document.body.classList.add(this.fuseConfig.colorTheme);
            });

        // const isAuthenticated = localStorage.getItem('auth');
        const isAuthenticated = localStorage.getItem('portal_nav');
        if (!isAuthenticated) {
            this.router.navigate(['login']);
        } else {
            this._fuseNavigationService.unregister('main');
            this._fuseNavigationService.register('main', JSON.parse(isAuthenticated));
        }

        this._fuseConfigService.dataDashboard$.subscribe(data => {
            this.dataSource = data;
        })

        this.refreshData();

        this._changeDetectorRef.detectChanges();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        if (this.postsSubscription) {
            this.postsSubscription.unsubscribe();
        }
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    readData(claim_status_code): void {
        const dataObs = this._DS.readObs(Dashboard, {
            claim_status_code,
            partner: this.authenticationService.getCompanyId()
        });
        const dataRes = dataObs.subscribe(
            (data) => {
                const tmp = this.dataSource;
    
                const found = this.dataSource.findIndex(x => x.claimStatusCode === claim_status_code);
                if (found >= 0) {
                    tmp[found]['count'] = data[0]['count'];
                } else {
                    tmp.push(data[0]);
                }

                this._fuseConfigService.updateDataDashboard(tmp)

                // if(this.dataSource.length === this.card.length) {
                //     this.isCardReady = true;
                // }

                this._CD.detectChanges();
            },
            err => console.log(err)
        );
        this._CD.detectChanges();
    }

    async refreshData(): Promise<any> {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
        await this.loadDataDashboard();
        await this.subscribeToData();
    }

    subscribeToData(): void {
        this.timerSubscription = timer(10000).subscribe(() => this.refreshData());
    }

    loadDataDashboard(): void{
        this.card = JSON.parse(localStorage.getItem('portal_nav'));
        if (this.card) {
            this.getDataNotification();
            this.card = this.card.filter(x => x.ID.toString().includes('_'))
            this.card.map(y => {
                this.readData(y.claimStatusCode);
            })
            this.listDataRevision = 0;
            this.listDataWaiting = 0;
        }
    }

    getDataNotification(): void {
        const revisionObs = this._DS.readObs(ClaimPartner, {
            claim_status_code: 'SC003',
            partner: this.authenticationService.getCompanyId()
        });
        const waitingObs = this._DS.readObs(ClaimPartner, {
            claim_status_code: 'SC004',
            partner: this.authenticationService.getCompanyId()
        });
        
        forkJoin([revisionObs, waitingObs]).subscribe(results => {
            let tmp = [];
            this._fuseConfigService.updateDataListDashboard(tmp.concat(results[0]['data'] ? results[0]['data'] : [], results[1]['data'] ? results[1]['data'] : []));
        });

        this._CD.detectChanges();
    }

}
