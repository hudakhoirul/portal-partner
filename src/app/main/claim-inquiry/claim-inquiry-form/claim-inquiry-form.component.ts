import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { AuthenticationService, Logger } from '@app/core';
import { RegisterClaimService } from '@app/main/register-claim/register-claim.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material';
import { finalize, takeUntil } from 'rxjs/operators';
import { DxFormComponent } from 'devextreme-angular/ui/form';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '@app/_shared/crud-service/data.service';
import { Illness } from '@app/_models/claim/illness';
import { Subscription, forkJoin, Subject } from 'rxjs';
import { Document, Currency, PolicyClaimDocument, ClaimPartner, ProcessHistory, Relation, Bank, ClaimDocFile, ClaimDoc, CompanyClaim, CompanyPolicy, ClaimFlowType, Claim, ClaimType } from '@app/_models/claim';
import { Location } from '@angular/common';
import notify from 'devextreme/ui/notify';
import * as _ from 'lodash';

const log = new Logger('ClaimInformation Form');

@Component({
    selector: 'app-claim-inquiry-form',
    templateUrl: './claim-inquiry-form.component.html',
    styleUrls: ['./claim-inquiry-form.component.scss']
})
export class ClaimInquiryFormComponent implements OnInit, OnDestroy {
    private unsub: Subject<void> = new Subject<any>();

    @ViewChild(DxFormComponent) myform: DxFormComponent;
    itemCount: number;
    companies = [{
        'ID': 1
    }, {
        'ID': 2,
    }, {
        'ID': 3,
    }];

    claimDoc: ClaimDoc[] = [];
    claimDocFile: ClaimDocFile[] = [];
    processHistory: ProcessHistory[] = [];
    illness: Illness[] = [];
    currency: Currency[] = [];
    policyClaimDocumen: PolicyClaimDocument[] = [];
    claimPartner: ClaimPartner[] = [];
    relations: Relation[] = [];
    banks: Bank[] = [];
    companyClaim: CompanyClaim[] = [];
    claimFlowType: ClaimFlowType[] = [];

    document: Document[] = [];

    documentFiles = [];
    fileUploadDataSource = [];
    isInsured = 'No';
    isPageLoadingVisible = false;
    isFormEditable = false;
    isDocumentEditable = false;
    isOtherIllness = false;
    isOtherBank = false;
    isPopupVisible = false;
    isNeedBenefiecyInfo = false;
    isNeedBankInsured = false;
    isInputAmount = false;
    first = true;

    selectedTransactionId = '';

    constructor(
        private router: ActivatedRoute,
        private DS: DataService,
        private CD: ChangeDetectorRef,
        private location: Location,
        private authService: AuthenticationService
    ) {
        this.itemCount = this.companies.length;
        this.isPageLoadingVisible = true;

        this.onIllnessChanged = this.onIllnessChanged.bind(this);
        this.onBankChanged = this.onBankChanged.bind(this);

    }

    ngOnInit(): void {
        const id = this.router.snapshot.paramMap.get('id');
        this.getInitialData(id);
    }
    ngOnDestroy(): void {
        this.CD.detach();
        this.unsub.next();
        this.unsub.complete();
    }
    getProcessHistory(id: any): void{
        const dataObs = this.DS.readObs(ProcessHistory, {
            claim_reg_no: id
        });
        const dataRes = dataObs.subscribe(
            (data: ProcessHistory[]) => {
                this.processHistory = data['data'];
                this.CD.detectChanges();
            },
            err => {
                console.log(err);
            }
        );
    }

    onBack(): void {
        this.location.back();
    }

    onCancel(): void{
        this.DS.updatexObs(Claim, {
            status: 'CANCEL'
        }, {
            transaction_form_id: this.claimPartner['transactionFormId'],
            transaction_id: this.claimPartner['transactionId']
        }).subscribe(() => {
            this.location.back();
        });
    }

    onSave(): void{
        // let data = this.claimPartner;
        // let saveData = {};
        // Object.keys(data).map((key,index)=>{
        //     if(data[key] !=null){
        //         saveData[_.snakeCase(key)]=data[key];
        //     }
        // })
        const saveData = {
            event_date: this.claimPartner['eventDate'],
            claim_amount: this.claimPartner['claimAmount'],
            currency_claim_code: this.claimPartner['currency'],
            illness_code: this.claimPartner['illnessCode'],
            claimant_name: this.claimPartner['claimantName'],
            claimant_relation_insured_code: this.claimPartner['claimantRelationInsuredCode'],
            claimant_phone_no: this.claimPartner['claimantPhoneNo'],
            claimant_email_address: this.claimPartner['claimantEmailAddress'],
            beneficiary_ktp_no: this.claimPartner['beneficiaryKtpNo'],
            beneficiary_family_card_no: this.claimPartner['partnerFamilyCardNo'],
            account_currency_code: this.claimPartner['currency'],
        };
        this.DS.updatexObs(Claim, {
            status: 'SAVE'
        }, saveData).subscribe(() => {
            this.location.back();
        });
    }

    onSubmit(): void{
        this.DS.updatexObs(Claim, {
            status: 'SUBMIT'
        }, {
            transaction_form_id: this.claimPartner['transactionFormId'],
            transaction_id: this.claimPartner['transactionId']
        }).subscribe(() => {
            this.location.back();
        });
    }

    getInitialData(id): void {
        
        const illnessObs = this.DS.readObs(Illness);
        const currencyObs = this.DS.readObs(Currency);
        const relationObs = this.DS.readObs(Relation);
        const bankObs = this.DS.readObs(Bank);
        const processHistoryObs = this.DS.readObs(ProcessHistory, {
            claim_reg_no: id
        });
        const claimPartnerObs = this.DS.readObs(ClaimPartner, {
            claim_reg_no: id,
            partner: this.authService.getCompanyId()
        });
                
        
        forkJoin([illnessObs, currencyObs, processHistoryObs, claimPartnerObs, relationObs, bankObs])
            .pipe(takeUntil(this.unsub))
            .subscribe(
                (res: any) => {
                    this.illness = res[0];
                    this.currency = res[1];
                    this.processHistory = res[2]['data'];
                    this.claimPartner = res[3]['data'][0];
                    this.relations = res[4];
                    this.banks = res[5];

                    // this.claimPartner['claimAmount'] = this.formatNumber(res[4]['data'][0]['claimAmount'])
                    this.selectedTransactionId = this.claimPartner['transactionId'];

                    if (this.claimPartner['claimantIsInsured'] === 1) {
                        this.isInsured = 'Yes';
                    }

                    this.getClaimDoc(this.claimPartner['transactionId']);
                    this.getCompanyClaim(this.claimPartner['policyNo'], this.claimPartner['claimTypeCode']);
                    this.getCompanyPolicy(this.claimPartner['policyNo']);
                    this.getFormsDocument(this.claimPartner['claimTypeCode']);

                    this.isPageLoadingVisible = false;
                    this.claimPartner = res[3]['data'][0];
                    this.first = false;

                    this.CD.detectChanges();
                },
                err => {
                    notify('Failed to retrieve data', 'error', 600);
                    this.isPageLoadingVisible = false;
                    this.CD.detectChanges();
                }
            );
    }

    formatDatePeriod(start, end): string {
        return `${moment(start).format('DD MMMM YYYY')} - ${moment(end).format('DD MMMM YYYY')}`;
    }
    onIllnessChanged(e): void {
        this.claimPartner['illness'] = e.value;
        if (e.value === 'ILLN190000') {
            this.isOtherIllness = true;
            this.claimPartner['otherIllness'] = '';
        } else {
            this.isOtherIllness = false;
            this.claimPartner['otherIllness'] = '';
        }

        this.CD.detectChanges();
    }
    onBankChanged(e): void {
        this.claimPartner['bankCode'] = e.value;
        if (e.value === '9999') {
            this.isOtherBank = true;
        } else {
            this.isOtherBank = false;
        }
    }

    viewUploadedFile(e): void {
        this.fileUploadDataSource = this.documentFiles[e.key].map(x => x.documentId === e.row.data.documentId && x.fileDownloadUri);
        this.isPopupVisible = true;
    }

    formatDate(date): string {
        return moment(date).format('DD MMMM YYYY HH:mm:ss');
    }
    getCompanyClaim(policyNo, claimTypeCode): Subscription {

        return this.DS.readObs(CompanyClaim, {
            'policy_no': policyNo,
            'claim_type_code': claimTypeCode
        })
            .subscribe(
                (res: CompanyClaim[]) => {
                    if (res['data'].length > 0) {
                        this.companyClaim = res['data'];
                        if (res['data'][0].needBeneficiaryInfo) {
                            this.isNeedBenefiecyInfo = true;
                        } else {
                            this.isNeedBenefiecyInfo = false;
                        }
                        if (res['data'][0].needBankInsured) {
                            this.isNeedBankInsured = true;
                        } else {
                            this.isNeedBankInsured = false;
                        }
                        this.CD.detectChanges();
                    }
                },
                err => {
                    console.error(err);
                    notify('Failed to retrieve data', 'error', 600);
                }
            );
    }

    getCompanyPolicy(policyNo): Subscription {

        return this.DS.readObsId(CompanyPolicy, policyNo)
            .subscribe(
                (res: CompanyPolicy[]) => {
                    this.getClaimFlowType(res['data'].claimFlow.id);

                    this.CD.detectChanges();
                },
                err => {
                    console.error(err);
                    notify('Failed to retrieve data', 'error', 600);
                }
            );
    }

    getClaimFlowType(flowId): Subscription {
        
        return this.DS.readObs(ClaimFlowType, {
            'claim_flow_id': flowId
        })
            .subscribe(
                (res: ClaimFlowType[]) => {

                    if (this.claimPartner['claimStatusCode'] === 'SC001') {
                        this.claimFlowType = res['data'].filter(x => x.flowType === 'Claim Registration');                        
                    } else if (this.claimPartner['claimStatusCode'] === 'SC003') {
                        this.claimFlowType = res['data'].filter(x => x.flowType === 'Document Revision');                        
                    } else if (this.claimPartner['claimStatusCode'] === 'SC004') {
                        this.claimFlowType = res['data'].filter(x => x.flowType === 'Input Claim Amount');
                    } else {
                        this.isFormEditable = false;
                    }

                    if (this.claimFlowType.length > 0) {
                        if (this.claimFlowType[0]['inputAmount']) {
                            this.isInputAmount = true;
                        } else {
                            this.isInputAmount = false;
                        }
                        
                        if (this.claimFlowType[0]['editInformation']) {
                            this.isFormEditable = false;
                        } else {
                            this.isFormEditable = false;
                        }
    
                        if (this.claimFlowType[0]['editDocument']) {
                            this.isDocumentEditable = false;
                        } else {
                            this.isDocumentEditable = false;
                        }
                    }
                    
                    this.CD.detectChanges();
                },
                err => {
                    console.error(err);
                    notify('Failed to retrieve data', 'error', 600);
                }
            );
    }


    onIsInsuredChanged(e): void {
        if (e.value === 'Yes') {
            if (this.first) {
                this.claimPartner['claimantName'] = this.claimPartner['participant'];
                this.claimPartner['claimantPhoneNo'] = this.claimPartner['phoneNo1'];
                this.claimPartner['claimantRelationInsuredCode'] = 'REL01';
                this.claimPartner['claimantEmailAddress'] = this.claimPartner['emailAddress'];
            }
            this.isInsured = 'Yes';
        } else {
            this.claimPartner['claimantName'] = '';
            this.claimPartner['claimantPhoneNo'] = '';
            this.claimPartner['claimantRelationInsuredCode'] = '';
            this.claimPartner['claimantEmailAddress'] = '';
            this.isInsured = 'No';
        }
    }


    claimAmountChanged(e): void {
        this.claimPartner['claimAmount'] = e.value;
    }

    formatNumber(num): string {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    getFormsDocument(claim_type_code): void {
        this.DS.readObs(ClaimType, {
            claim_type_code: claim_type_code
        }).subscribe(
            (res: ClaimType[]) => {
                if (res['data'].length > 0) {
                    this.DS.readObs(Document, {
                        claim_id: res['data'][0].claimTypeId
                    }).subscribe(
                        (res2: Document[]) => {
                            this.document = res2['data'];
                            this.CD.detectChanges();
                        },
                        err => {
                            console.error(err);
                            notify('Failed to retrieve data', 'error', 600);
                        }
                    );
                    this.CD.detectChanges();
                }
            },
            err => {
                console.error(err);
                notify('Failed to retrieve data', 'error', 600);
            }
        );
    }

    getClaimDoc(transaction_id): void {

        const claimDocObs = this.DS.readObs(ClaimDoc, {
            transaction_id
        }).subscribe(
            (res: ClaimDoc[]) => {
                this.claimDoc = res['data'];
                this.CD.detectChanges();
            },
            err => {
                console.error(err);
                notify('Failed to retrieve data', 'error', 600);
            }
        );

    }
    
}
