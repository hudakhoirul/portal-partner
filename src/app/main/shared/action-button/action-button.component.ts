import {Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit} from '@angular/core';
import {Logger} from '@app/core';
import * as _ from 'lodash';
import * as moment from 'moment';

const log = new Logger('RegisterClaim Form');

@Component({
    selector: 'action-button',
    templateUrl: './action-button.component.html',
    styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements OnInit {

    @Input() claimPartner: any;
    @Input() canSave: any;
    @Input() isFormEditable: any;
    @Output() onSave: EventEmitter<any> = new EventEmitter();
    @Output() onSubmit: EventEmitter<any> = new EventEmitter();
    @Output() onCancel: EventEmitter<any> = new EventEmitter();

    constructor(
        private CD: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
    }

    onSaveClick(): void {
        this.onSave.emit();
    }

    onSubmitClick(): void {
        this.onSubmit.emit();
    }

    onCancelClick(): void {
        this.onCancel.emit();
    }


}
