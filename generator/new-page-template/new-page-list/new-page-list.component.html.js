module.exports = (names, params) => {
    return `
        <div class="page-layout carded fullwidth">
            <div class="top-bg accent"></div>
            <div class="center">
                <div class="example-loading-shade" *ngIf="isLoading">
                    <mat-spinner *ngIf="isLoading"></mat-spinner>
                </div>

                <div class="header accent" fxlayout="column" fxlayout.gt-sm="row" fxlayoutalign="center center" fxlayoutalign.gt-sm="space-between center">
                    <div class="logo mb-24 mb-md-0" fxlayout="row" fxlayoutalign="start center">
                        <mat-icon class="logo-icon s-32 mr-16 mat-icon material-icons ng-trigger ng-trigger-animate mat-icon-no-color" role="img" aria-hidden="true">
                            access_time
                        </mat-icon>
                        <span class="logo-text h1 ng-trigger ng-trigger-animate"> Container Type Management </span>
                    </div>
                    <button class="add-product-button fuse-white mt-24 mt-md-0 mat-raised-button" (click)="addDialog()">
                        <span class="mat-button-wrapper">
                            <mat-icon>note_add</mat-icon> <span>New Container Type</span>
                        </span>
                    </button>
                </div>

                <div class="content-card">
                    <custom-table 
                        [cols]="cols"
                        [data]="${names.camelCase}"
                        [config]="config"
                        (clickEdit)="onEdit($event)"
                    ></custom-table>
                </div>

            </div>
        </div>
    `;
};