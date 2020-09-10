import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { merge, Subject, Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

import { DxTreeViewModule } from 'devextreme-angular';
import { Router } from '@angular/router';
import { FuseConfigService } from '@fuse/services/config.service';

@Component({
    selector       : 'fuse-navigation',
    templateUrl    : './navigation.component.html',
    styleUrls      : ['./navigation.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuseNavigationComponent implements OnInit, OnDestroy
{
    @Input()
    layout = 'vertical';

    @Input()
    navigation: any;

    dataSource = [];
    subscription: Subscription;

    private timerSubscription: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private router: Router,
        private translate: TranslateService,
        private fuseConfigService: FuseConfigService,
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    selectItem(e): void {
        if (e.node.expanded) {
            e.component.collapseItem(e.node.key);
        } else {
            e.component.expandItem(e.node.key);
        }

        this._changeDetectorRef.detectChanges();

        if (e.itemData.url) {
            this.router.navigate([e.itemData.url]);
        }
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.subscription = this.fuseConfigService.dataDashboard$.subscribe(
            data => {
                this.dataSource = data;
        });

        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();
        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {

                // Load the navigation
                this.navigation = this._fuseNavigationService.getCurrentNavigation();

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to navigation item
        merge(
            this._fuseNavigationService.onNavigationItemAdded,
            this._fuseNavigationService.onNavigationItemUpdated,
            this._fuseNavigationService.onNavigationItemRemoved
        ).pipe(takeUntil(this._unsubscribeAll))
         .subscribe(() => {

             // Mark for check
             this._changeDetectorRef.markForCheck();
         });

         this.subscribeToData();
    }

    ngOnDestroy() {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }

    subscribeToData(): void {
        this.timerSubscription = timer(1000).subscribe(() => this.refresh());
    }

    async refresh () {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
        this._changeDetectorRef.markForCheck();
        await this.subscribeToData();
    }

    getTranslationText(key) {
        if(!key) return
        
        let tmp = '';
        var Nkey = key.split(" ").join("");
        this.translate.get(Nkey).subscribe((res: string) => {
            tmp = res
        });
        // console.log(key)
        this._changeDetectorRef.markForCheck();
        return tmp;
    }

    testUrl(e, link): boolean {
        if (!link) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }

    checkPath(path) {
        if (path) {
            return path.includes('/outstanding/');
        }
    }

    getNumber(claim_status_code) {
        const found = this.dataSource.find(x => x.claimStatusCode === claim_status_code);
        if (found) {
            return found['count'];
        } else {
            return '-';
        }
    }
}
