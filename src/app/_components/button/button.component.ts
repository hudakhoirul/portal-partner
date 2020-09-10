import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'px-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {

    @Input() label: string;
    @Input() type: string;
    @Input() icon: string;
    @Input() stylingMode: string = null;
    @Input() width: string = null;
    @Input() height: string = null;

    ngOnInit(): void {
        if (this.stylingMode == null) {
            this.stylingMode = 'contained';
        }
        else {
            this.stylingMode = 'outlined';
        }

      
        if (this.width == null || this.width === ''){
            this.width = 'auto';
        }
        
        if (this.height == null || this.height === ''){
            this.height = 'auto';
        }
    }

}
