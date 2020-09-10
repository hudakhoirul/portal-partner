import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-outstanding-list',
    templateUrl: './outstanding-list.component.html',
    styleUrls: ['./outstanding-list.component.scss']
})
export class OutstandingListComponent implements OnInit {

    @Input() column: any;
    @Input() dataSource: any;
    @Input() title: string;
    @Input() status: string;

    constructor(       
        private router: Router
    ) {
    }

    ngOnInit(): void {

    }

    goToView(e): void {
        const id = e.data.claimRegNo;
        // const stat = e.data.claim
        this.router.navigate([`register-claim/${id}`]);
        
    }

}
