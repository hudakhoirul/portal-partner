import {Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'px-animated-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {

    @Input() label: string;
    @Input() type: string;
    @Input() icon: string;
    @Input() stylingMode: string = null;
    @Input() width = 100;
    @Input() height = 33;
    @Input() isLoading = false;
    @Input() style;
    @Output() buttonClick: EventEmitter<any> = new EventEmitter();

    ngOnInit(): void {
        if (this.stylingMode == null) {
            this.stylingMode = 'contained';
        }
        else {
            this.stylingMode = 'outlined';
        }
    }

    onButtonClick($event): void {
        this.buttonClick.emit($event);
    }

}
