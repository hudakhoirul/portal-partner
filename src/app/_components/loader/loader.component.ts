import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'px-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoaderComponent implements OnInit {

    @Input() loading = false;

    ngOnInit(): void {
        
    }
}
