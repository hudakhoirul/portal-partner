import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {fuseAnimations} from '@fuse/animations';
import {Logger, AuthenticationService} from '@app/core';
import { DataService } from '@app/_shared/crud-service/data.service';
import { Dashboard } from '@app/_models/claim/dashboard';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { Subscription, timer } from 'rxjs';
import { FuseConfigService } from '@fuse/services/config.service';

const log = new Logger('Dashboard');

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {
    color: any;
    name: any;
    dataSource = [];
    card = [];
    cardDraft = false;
    cardChecking = false;
    cardWaiting = false;
    cardRevision = false;
    cardProcessed = false;
    isCardReady = true;

    param = {value: ''};
    subscription: Subscription;

    constructor(
        private _DS: DataService,
        private router: Router,
        private _CD: ChangeDetectorRef,
        private authService: AuthenticationService,
        private translate: TranslateService,
        private fuseConfigService: FuseConfigService) {

        this.dataSource = [];

        // this.translate.setDefaultLang('en');
        // this.translate.use('id');) {

        this.subscription = this.fuseConfigService.dataDashboard$.subscribe(
            data => {
                this.dataSource = data;
        });
    }

    readData(claim_status_code): void {
        const dataObs = this._DS.readObs(Dashboard, {
            claim_status_code,
            partner: this.authService.getCompanyId()
        });
        const dataRes = dataObs.subscribe(
            (data) => {
                console.log('ada ', claim_status_code)

                this.getStatus(data[0]['claimStatusCode']);
                const tmp = this.dataSource;
    
                const found = this.dataSource.findIndex(x => x.claimStatusCode === claim_status_code);
                if (found >= 0) {
                    tmp[found]['count'] = data[0]['count'];
                } else {
                    tmp.push(data[0]);
                }

                this.fuseConfigService.updateDataDashboard(tmp)

                // if(this.dataSource.length === this.card.length) {
                //     this.isCardReady = true;
                // }

                this._CD.detectChanges();
            },
            err => console.log(err)
        );
        this._CD.detectChanges();
    }

    ngOnInit(): void {
        this.name = this.authService.getUser()['name'];
        this.param['value'] = this.name;
        this.card = JSON.parse(localStorage.getItem('portal_nav'));
        this.card = this.card.filter(x => x.ID.toString().includes('_'))
        this.fuseConfigService.updateCardDashboard(this.card);

        this.card.map(x => {
            // this.readData(x.claimStatusCode);
            this.getStatus(x.claimStatusCode);
        })

        this.loadDataDashboard();
        this.color = '#e74c3c';

        setTimeout(() => {
            this._CD.detectChanges();
        }, 2000);
    }

    ngOnDestroy() {
    }

    goToList(code): void {
        if (code === 'SC001') {
            this.router.navigate([`outstanding/draft-list`]);
        } else if (code === 'SC002') {
            this.router.navigate([`outstanding/document-checking-list`]);
        } else if (code === 'SC003') {
            this.router.navigate([`outstanding/claim-revision-list`]);
        } else if (code === 'SC004') {
            this.router.navigate([`outstanding/waiting-claim-amount-list`]);
        } else if (code === 'SC005') {
            this.router.navigate([`outstanding/claim-process-list`]);
        }
    }

    getStatus(code): string {
        if (code === 'SC001') {
            this.cardDraft = true;
            return this.getTranslationText('dashboard.status.draft');
        } else if (code === 'SC002') {
            this.cardChecking = true;
            return this.getTranslationText('dashboard.status.checking');
        } else if (code === 'SC003') {
            this.cardWaiting = true;
            return this.getTranslationText('dashboard.status.revision');
        } else if (code === 'SC004') {
            this.cardRevision = true;
            return this.getTranslationText('dashboard.status.waiting');
        } else if (code === 'SC005') {
            this.cardProcessed = true;
            return this.getTranslationText('dashboard.status.processed');
        }
    }

    getTranslationText(key) {
        let tmp = '';
        this.translate.get(key).subscribe((res: string) => {
            tmp = res
        });
        return tmp;
    }

    getValue(code): any {
        if (code === 'SC001') {
            const found = this.dataSource.find(x => x.claimStatusCode === 'SC001');
            return found ? found['count'] : '-';
        } else if (code === 'SC002') {
            const found = this.dataSource.find(x => x.claimStatusCode === 'SC002');
            return found ? found['count'] : '-';
        } else if (code === 'SC003') {
            const found = this.dataSource.find(x => x.claimStatusCode === 'SC003');
            return found ? found['count'] : '-';
        } else if (code === 'SC004') {
            const found = this.dataSource.find(x => x.claimStatusCode === 'SC004');
            return found ? found['count'] : '-';
        } else if (code === 'SC005') {
            const found = this.dataSource.find(x => x.claimStatusCode === 'SC005');
            return found ? found['count'] : '-';
        }
    }

    loadDataDashboard(): void {
        this.card = JSON.parse(localStorage.getItem('portal_nav'));
        this.card = this.card.filter(x => x.ID.toString().includes('_'))
        this.card.map(x => {
            this.readData(x.claimStatusCode);
        })
    }
}
