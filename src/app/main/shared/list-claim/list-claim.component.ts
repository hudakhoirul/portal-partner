import {Component, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {Logger} from '@app/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';

const log = new Logger('RegisterClaim Form');

export class ClaimDocument {
    no: number;
    documentName: string;
    condition: string;
    documentUploaded: number;
}

@Component({
    selector: 'list-claim',
    templateUrl: './list-claim.component.html',
    styleUrls: ['./list-claim.component.scss']
})
export class ListClaimComponent {

    @Input() dataSource: any;
    @Input() column: any;
    @Input() type: any;
    @Input() status = 'SC002';
    @Output() selected: EventEmitter<any> = new EventEmitter();
    isPageLoadingVisible: boolean;

    constructor(
        private CD: ChangeDetectorRef,
        private translate: TranslateService,
    ) {
        this.isPageLoadingVisible = true;
    }

    onSelected(data): void {
        this.selected.emit(data);
    }

    formatDate(date): string {
        return moment(date).format('DD MMMM YYYY');
    }

    getButtonText(): string {
        if (this.status === 'SC001' || this.status === 'SC003' || this.status === 'SC004') {
            return this.getTranslationText('listClaim.Edit');
        } else  if (this.status === 'SC002' || this.status === 'SC005' || this.status === 'SC006') {
            return this.getTranslationText('listClaim.View');
        }
    }

    onDataReady(e): void {
        setTimeout(() => {
            this.CD.detectChanges();
        }, 300);
    }

    formatCurrency(val): number {
        if (val === 'null') {
            return 0;
        }
        return val;
    }

    onRowPrepared(e): void {
        if (e.rowType != "header" && !e.data.read) {
            e.rowElement.style.backgroundColor = '#d1e05b'; 
        }
    }

    getTranslationText(key) {
        let tmp = '';
        this.translate.get(key).subscribe((res: string) => {
            tmp = res
        });
        return tmp;
    }
}
