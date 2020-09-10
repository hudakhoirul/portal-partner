import {Component, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef, OnInit} from '@angular/core';
import {Logger} from '@app/core';
import * as _ from 'lodash';
import * as moment from 'moment';

const log = new Logger('RegisterClaim Form');

export class ClaimDocument {
    no: number;
    documentName: string;
    condition: string;
    documentUploaded: number;
}

@Component({
    selector: 'list-policy',
    templateUrl: './list-policy.component.html',
    styleUrls: ['./list-policy.component.scss']
})
export class ListPolicyComponent implements OnInit {

    @Input() dataSource: any;
    @Output() selected: EventEmitter<any> = new EventEmitter();
    isPageLoadingVisible: boolean;

    constructor(
        private CD: ChangeDetectorRef,
    ) {
        this.isPageLoadingVisible = true;
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.CD.detectChanges();
        }, 400);
    }

    onSelected(data): void {
        this.selected.emit(data);
    }

    formatDate(date): string {
        return moment(date).format('DD MMMM YYYY');
    }

    onDataReady(e): void {
        this.CD.detectChanges();
    }


}
