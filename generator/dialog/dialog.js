module.exports = `<div class="example-loading-shade" *ngIf="isLoading">
<mat-spinner *ngIf="isLoading"></mat-spinner>
</div>
<h1 align="center" class="mb-4" mat-dialog-title>Add New Container Type</h1>
<hr class="mb-20">
<form name="form" [formGroup]="containerTypeForm" (ngSubmit)="submitContainerType()">
<div mat-dialog-content style="max-height: none;">
    <div fxLayout="column" fxLayoutAlign="start" fxFlex="1 0 auto">

        <div fxLayout="row" fxLayoutAlign="start center" fxFlex="1 0 auto">
            <mat-form-field fxFlex="100">
                <mat-label>Container Type</mat-label>
                <input matInput formControlName="containerType" required
                       cdkFocusInitial>
                <mat-error>Container Type required!</mat-error>
            </mat-form-field>
        </div>

        <div fxLayout="row" fxLayoutAlign="start center" fxFlex="1 0 auto">
            <mat-form-field fxFlex="100">
                <mat-label>Container Description</mat-label>
                <input matInput formControlName="containerDesc" required
                        cdkFocusInitial>
                <mat-error>Container Description required!</mat-error>
            </mat-form-field>
        </div>

        <div fxLayout="row" fxLayoutAlign="start center" fxFlex="1 0 auto">
            <mat-form-field fxFlex="100">
                <mat-label>Size</mat-label>
                <input matInput formControlName="size" required
                        cdkFocusInitial>
                <mat-error>Size required!</mat-error>
            </mat-form-field>
        </div>

    </div>
</div>
<mat-dialog-actions class="mb-4" align="end">
    <button mat-raised-button color="warn" mat-dialog-close>
        <mat-icon>cancel</mat-icon>
        Cancel
    </button>
    <button mat-raised-button color="accent" class="ml-8" type="submit" [disabled]="!containerTypeForm.valid">
        <mat-icon>save</mat-icon>
        Save
    </button>
</mat-dialog-actions>
</form>`