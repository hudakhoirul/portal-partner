import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {AuthenticationService, Logger} from '@app/core';
import {RegisterClaimService} from '@app/main/register-claim/register-claim.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialogRef} from '@angular/material';
import {finalize} from 'rxjs/operators';
import { DxFormComponent } from 'devextreme-angular/ui/form';

const log = new Logger('RegisterClaim Form');

export class ClaimRegistration {
    id: string;
    insuredNo: string;
    insuredName: string;
    ktpNo: string;
    birthOfDate: string;
    idMemberPartner: string;
    polis: string;
    insurancePeriod: string;
    currency: string;
    sumAssured: number;
}

export class Company {
    ID: number;
    CompanyName: string;
    Address: string;
    City: string;
    State: string;
    Zipcode: number;
    Phone: string;
    Fax: string;
    Website: string;
}

export class ClaimDocument {
    no: number;
    documentName: string;
    condition: string;
    documentUploaded: number;
}

export class ClaimDocumentDetail {
    fileName: string;
    uploadBy: string;
    uploadDate: string;
}

@Component({
    selector: 'app-outstanding-view',
    templateUrl: './outstanding-view.component.html',
    styleUrls: ['./outstanding-view.component.scss']
})
export class RegisterClaimFormComponent implements OnInit {

    @ViewChild(DxFormComponent) myform: DxFormComponent;
    employee = {
        ID: 1,
        product: 'Heart',
        insuredName: 'John',
        idMemberPartner: 'MBR123',
        ktpNo: '19640316',
        birthOfDate: '1995/01/15',
    };
    positions: string[];
    rules: Object;
    itemCount: number;
    
    claimRegistration: ClaimRegistration[] = [{
        'id': '1',
        'insuredNo': '2019.00001',
        'insuredName': 'Adi Jaya Kusuma',
        'ktpNo': '123456789',
        'birthOfDate': '02 July 1990',
        'idMemberPartner': '19909089',
        'polis': 'POL0001-AJB',
        'insurancePeriod': '1 January 2019 - 30 Juni 2019',
        'currency': 'IDR',
        'sumAssured': 2000000,
    }, {
        'id': '1',
        'insuredNo': '2019.00002',
        'insuredName': 'Perdana Aman',
        'ktpNo': '123456789',
        'birthOfDate': '02 December 1990',
        'idMemberPartner': '19909090',
        'polis': 'POL0002-AJB',
        'insurancePeriod': '1 January 2019 - 30 Juni 2019',
        'currency': 'IDR',
        'sumAssured': 200000,
    }];

    companies: Company[] = [{
        'ID': 1,
        'CompanyName': 'SuprMart',
        'Address': '702 SW 8th Street',
        'City': 'Bentonville',
        'State': 'Arkansas',
        'Zipcode': 72716,
        'Phone': '(800) 555-2797',
        'Fax': '(800) 555-2171',
        'Website': 'http://www.nowebsitesupermart.com',
    }, {
        'ID': 2,
        'CompanyName': 'El\'Depot',
        'Address': '2455 Paces Ferry Road NW',
        'City': 'Atlanta',
        'State': 'Georgia',
        'Zipcode': 30339,
        'Phone': '(800) 595-3232',
        'Fax': '(800) 595-3231',
        'Website': 'http://www.nowebsitedepot.com',
    }, {
        'ID': 3,
        'CompanyName': 'El\'Depot',
        'Address': '2455 Paces Ferry Road NW',
        'City': 'Atlanta',
        'State': 'Georgia',
        'Zipcode': 30339,
        'Phone': '(800) 595-3232',
        'Fax': '(800) 595-3231',
        'Website': 'http://www.nowebsitedepot.com',
    }]
    
    claimDocument: ClaimDocument[] = [{
        no: 1,
        documentName: 'Kartu Tanda Penduduk Tertanggung',
        condition: 'Mandatory',
        documentUploaded: 1,
    }, {
        no: 2,
        documentName: 'Surat Keterangan',
        condition: 'Optional',
        documentUploaded: 0,
    }];

    claimDocumentDetail: ClaimDocumentDetail[] = [{
        'fileName': 'ktp.jpg',
        'uploadBy': 'Dewi',
        'uploadDate': '3 Maret 2019 09:10',
    }];

    constructor() {
        this.itemCount = this.companies.length;
    }

    ngOnInit(): void {
    }

}
