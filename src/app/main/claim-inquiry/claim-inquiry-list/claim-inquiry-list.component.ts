import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Logger, AuthenticationService} from '@app/core';
import { takeUntil} from 'rxjs/operators';
import { DxFormComponent } from 'devextreme-angular';
import { ClaimType, CompanyPolicy, ClaimStatus, ClaimPartner, ClaimDocFile } from '@app/_models/claim';
import notify from 'devextreme/ui/notify';
import { forkJoin, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { DataService } from '@app/_shared/crud-service/data.service';

const log = new Logger('ClaimInquiry Form');

export class ClaimDocument {
    no: number;
    documentName: string;
    condition: string;
    documentUploaded: number;
}

@Component({
    selector: 'app-claim-inquiry-list',
    templateUrl: './claim-inquiry-list.component.html',
    styleUrls: ['./claim-inquiry-list.component.scss']
})

export class ClaimInquiryListComponent implements OnInit, OnDestroy {

    @ViewChild('insuredForm') insuredForm: DxFormComponent;
    private unsub: Subject<void> = new Subject<any>();
    insured = {
        product: {},
        idMemberPartner: '',
        claimRegisterNo: '',
        insuredName: '',
        status: '',
        claimType: '',
    };

    companyPolicy: CompanyPolicy[] = [];
    claimType: ClaimType[] = [];
    statusClaim: ClaimStatus[] = [];
    claimPartner: ClaimPartner[] = [];
    claimDocument: ClaimDocument[] = [];
    claimDocFile: ClaimDocFile[] = [];
    isButtonListLoading = false;
    isPageLoadingVisible = true;
    column = [];
    selectedProduct: any;

    constructor(
        private DS: DataService,
        private CD: ChangeDetectorRef,
        private router: Router,
        private AuthService: AuthenticationService) {

        this.onProductChanged = this.onProductChanged.bind(this);
    }

    ngOnInit(): void {
        this.getInitialData();
    }
    ngOnDestroy(): void {
        this.CD.detach();
        this.unsub.next();
        this.unsub.complete();
    }
    getInitialData(): void {
        const companyPolicyObs = this.DS.readObs(CompanyPolicy, {
            company_id: this.AuthService.getCompanyId()
        });
        const statusClaimObs = this.DS.readObs(ClaimStatus);
        
        forkJoin([companyPolicyObs, statusClaimObs])
            .pipe(takeUntil(this.unsub))
            .subscribe(
                (res: any) => {
                    this.companyPolicy = res[0];
                    this.statusClaim = res[1];
                    this.isPageLoadingVisible = false;
                    this.CD.detectChanges();
                },
                err => {
                    this.isPageLoadingVisible = false;
                    notify('Failed to retrieve data', 'error', 600);
                    this.CD.detectChanges();
                }
            );
    }

    goToView(e): void {
        const id = e.data.claimRegNo;
        this.router.navigate([`claim-inquiry/${id}`]);
    }
    
    getListInsured(): Subscription {

        if (this.isButtonListLoading){
            return;
        }

        if (this.insuredForm.instance.validate().isValid) {
            this.isButtonListLoading = true;
            
            const params = {
                partner: this.AuthService.getCompanyId(),
                policy_no: this.selectedProduct['policyNo']
            };
            
            if (this.insured.idMemberPartner) {
                params['id_member_partner'] = this.insured.idMemberPartner;
            }
    
            if (this.insured.claimRegisterNo) {
                params['claim_reg_no'] = this.insured.claimRegisterNo;
            }
    
            if (this.insured.claimType) {
                params['claim_type_code'] = this.insured.claimType;
            }
    
            if (this.insured.insuredName) {
                params['participant'] = this.insured.insuredName;
            }
    
            if (this.insured.status) {
                params['claim_status_code'] = this.insured.status;
            }

            return this.DS.readObs(ClaimPartner, params)
            .subscribe(
                (res: any) => {
                    if (res.data.length > 0) {
                        this.claimPartner = res.data;
                        this.isButtonListLoading = false;
                        this.CD.detectChanges();
                    } else {
                        this.claimPartner = [];
                        this.isButtonListLoading = false;
                        this.CD.detectChanges();
                        notify('Data not found', 'error', 600);
                    }
                    setTimeout(() => {
                        this.CD.detectChanges();
                    }, 300);
                },
                err => {
                    console.error(err);
                    this.claimPartner = [];
                    this.isButtonListLoading = false;
                    this.CD.detectChanges();
                    notify('Failed to retrieve data', 'error', 600);
                },
            );
        }
    }
    
    resetFilter(): void {
        
        if (this.isButtonListLoading){
            return;
        }

        this.insured = {
            product: null,
            idMemberPartner: null,
            claimRegisterNo: null,
            insuredName: null,
            status: null,
            claimType: null,
        };

        this.claimPartner = [];
        this.claimType = [];
        this.CD.detectChanges();
    }

    getClaimType(policy_id): Subscription {
        return this.DS.readObs(ClaimType, {
            policy_id
        })
            .subscribe(
                (res: any) => {
                    if (res.data.length > 0) {
                        this.claimType = res.data;
                        this.CD.detectChanges();
                    } else {
                        notify('Claim type not found', 'error', 600);
                    }
                },
                err => {
                    console.error(err);
                    this.claimType = [];
                    this.CD.detectChanges();
                    notify('Failed to retrieve claim type data', 'error', 600);
                },
            );
    }

    onProductChanged(e): void {
        this.claimType = [];

        if (e.value) {
            this.selectedProduct = this.companyPolicy['data'].find(x => x.id === e.value);
            this.getClaimType(e.value);
        }

        this.CD.detectChanges();
    }

}
