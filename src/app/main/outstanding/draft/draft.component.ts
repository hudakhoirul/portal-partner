import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { Subject } from 'rxjs';
import { ClaimPartner } from '@app/_models/claim';
import { DataService } from '@app/_shared/crud-service/data.service';
import notify from 'devextreme/ui/notify';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-draft',
    templateUrl: './draft.component.html',
    styleUrls: ['./draft.component.scss']
})
export class DraftComponent implements OnInit, OnDestroy {
    private unsub: Subject<void> = new Subject<any>();
    dataSource: ClaimPartner[] = [];
    title = '';
    status = '';

    public column = [
        {field: 'action', caption: 'Action'},
        {field: 'claimRegNo', caption: 'Claim Reg. No'},
        {field: 'partnerAccountNo', caption: 'Insured No'},
        {field: 'partnerAccountName', caption: 'Insured Name'},
        {field: 'IdMemberPartner', caption: 'ID Member Partner'},
        {field: 'policyNo', caption: 'Polis'},
        {field: 'eventDate', caption: 'Event Date', type: 'datetime'},
        {field: 'claimTypeCode', caption: 'Claim Type'},
        {field: 'currency', caption: 'Currency'},
        {field: 'claimAmount', caption: 'Claim Amount'},
        {field: 'createdBy', caption: 'Registered By', type: 'datetime'},
        {field: 'createdDate', caption: 'Registration Date', type: 'datetime'},
        {field: 'status', caption: 'Status'},
    ];

    constructor(
        private _DS: DataService,
        private _CD: ChangeDetectorRef,
        private route: ActivatedRoute,
        private authService: AuthenticationService,
        private router: Router,
        private translate: TranslateService,
        ) {
    }

    ngOnInit(): void {
        this.router.routeReuseStrategy.shouldReuseRoute = function(){
            return false;
        };
        this.readData();
    }

    readData(): void {
        const dataObs = this._DS.readObs(ClaimPartner, {
            claim_status_code: this.getStatus(this.route.snapshot.paramMap.get('path')),
            partner: this.authService.getCompanyId()
            // partner: 1
        });
        const dataRes = dataObs.subscribe(
            (data: ClaimPartner[]) => {
                this.dataSource = data;
                this._CD.detectChanges();
            },
            err => {
                notify('Failed to retrieve data', 'error', 600);
            }
        );
    }

    getStatus(path): string {
        if (path === 'draft-list') {
            // this.title = path.replace(/-/g, ' ').toUpperCase();
            this.status = 'SC001';
            this.title = this.getTranslationText('DraftList').toUpperCase();
            return 'SC001';
        } else if (path === 'document-checking-list') {
            // this.title = path.replace(/-/g, ' ').toUpperCase();
            this.status = 'SC002';
            this.title = this.getTranslationText('DocumentCheckingList').toUpperCase();
            return 'SC002';
        } else if (path === 'claim-revision-list') {
            // this.title = path.replace(/-/g, ' ').toUpperCase();
            this.status = 'SC003';
            this.title =  this.getTranslationText('ClaimRevisionList').toUpperCase();
            return 'SC003';
        } else if (path === 'waiting-claim-amount-list') {
            // this.title = path.replace(/-/g, ' ').toUpperCase();
            this.status = 'SC004';
            this.title = this.getTranslationText('WaitingClaimAmountList').toUpperCase();
            return 'SC004';
        } else if (path === 'claim-process-list') {
            // this.title = path.replace(/-/g, ' ').toUpperCase();
            this.status = 'SC005';
            this.title =this.getTranslationText('ClaimProcessList').toUpperCase();
            return 'SC005';
        } else if (path === 'claim-process-on-core-system-list') {
            this.title = path.replace(/-/g, ' ').toUpperCase();
            this.status = 'SC006';
            return 'SC006';
        } 
    }

    getTranslationText(key) {
        let tmp = '';
        this.translate.get(key).subscribe((res: string) => {
            tmp = res
        });
        return tmp;
    }

    ngOnDestroy(): void {
       this.unsub.next();
       this.unsub.complete();
    }

}
