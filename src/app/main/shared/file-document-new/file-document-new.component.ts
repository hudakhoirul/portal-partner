import {Component, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, OnChanges, OnInit} from '@angular/core';
import {Logger, AuthenticationService} from '@app/core';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import * as _ from 'lodash';
import * as moment from 'moment';
import { DxDataGridComponent } from 'devextreme-angular';
import { MatStepper } from '@angular/material';
import { ClaimDocFile } from '@app/_models/claim';
import { DataService } from '@app/_shared/crud-service/data.service';
import { DocumentFile } from '@app/_models/claim/documentFile';
import * as uuid from 'uuid';
import { environment } from './../../../../environments/environment.prod'; 
import {TranslateService} from '@ngx-translate/core';

const log = new Logger('RegisterClaim Form');

@Component({
    selector: 'file-document-new',
    templateUrl: './file-document-new.component.html',
    styleUrls: ['./file-document-new.component.scss']
})
export class FileDocumentNewComponent implements OnChanges, OnInit {

    @ViewChild('claimDocGrid') claimDocGrid: DxDataGridComponent;
    @Input() data: any;
    @Input() editable: any;
    @Input() type: any;
    @Input() claimType: any;
    @Input() policyCode: any;
    @Output() documentChanged: EventEmitter<any> = new EventEmitter();
    @ViewChild('myPond') myPond: any;

    documentFiles = [];
    deleteDocumentPool = [];
    uploadLink = '';
    url = '';
    // uploadLink = `${environment.api_url}api/v1/uploads`;
    uploadHeaders = {
        Authorization: this.AuthService.getToken()
    };
    // uploader: FileUploader = new FileUploader({});
    isPopupVisible = false;
    isMultiSelected = false;
    isFormEditable = true;
    fileUploadDataSource = [];

    pondFiles = [];

    getPondOptions(data) {
        return {
            class: 'my-filepond',
            multiple: true,
            labelIdle: 'Drop files here or click',
            acceptedFileTypes: 'image/jpeg, image/png',
            server: {
                url: environment.api_url,
                
                process:(fieldName, file, metadata, load, error, progress, abort) => {
    
                    // fieldName is the name of the input field
                    // file is the actual file object to send
                    const formData = new FormData();
                    formData.append('files', file, file.name);
        
                    const request = new XMLHttpRequest();
                    request.open('POST', this.uploadLink);
                    request.setRequestHeader("Authorization", this.AuthService.getToken());
        
                    // Should call the progress method to update the progress to 100% before calling load
                    // Setting computable to false switches the loading indicator to infinite mode
                    request.upload.onprogress = (e) => {
                        progress(e.lengthComputable, e.loaded, e.total);
                    };
        
                    // Should call the load method when done and pass the returned server file id
                    // this server file id is then used later on when reverting or restoring a file
                    // so your server knows which file to return without exposing that info to the client
                    request.onload = () => {
                        if (request.status >= 200 && request.status < 300) {
                            // the load method accepts either a string (id) or an object
    
                            const response = JSON.parse(request.response);
    
                            response.data.map((x, i) => {
                                if (this.documentFiles[data.data.documentId]) {
                                    this.documentFiles[data.data.documentId].push({
                                        id: uuid.v4(),
                                        documentId: data.data.documentId, 
                                        documentCode: data.data.documentCode, 
                                        fileName: x.fileName,
                                        fileDownloadUri: x.fileDownloadUri,
                                    });
                                } else {
                                    this.documentFiles[data.data.documentId] = [{
                                        id: uuid.v4(),
                                        documentId: data.data.documentId, 
                                        documentCode: data.data.documentCode, 
                                        fileName: x.fileName,
                                        fileDownloadUri: x.fileDownloadUri,
                                    }];
                                }
                            });
                            this.onDocumentChanged();
            
                            notify('Upload file finished', 'success', 600);
                            load(request.responseText);
                        }
                        else {
                            // Can call the error method if something is wrong, should exit after
                            error('oh no');
                        }
                    };
        
                    const asd = request.send(formData);
    
                    // Should expose an abort method so the request can be cancelled
                    return {
                        abort: () => {
                            // This function is entered if the user has tapped the cancel button
                            request.abort();
        
                            // Let FilePond know the request has been cancelled
                            abort();
                        }
                    };
                }
            }
        }
    }

    constructor(
        private CD: ChangeDetectorRef,
        private DS: DataService,
        private AuthService: AuthenticationService,
        private translate: TranslateService,
    ) {
    }

    ngOnInit(): void {
    }

    ngOnChanges(): void {
        this.url = `${environment.api_url}api/v1/uploads?claim_id=${this.claimType}&policy_no=${this.policyCode}`;
        this.uploadLink = `${environment.api_url}api/v1/uploads?claim_id=${this.claimType}&policy_no=${this.policyCode}`;
    }

    contentReady(e): void {
        if (!e.component.getSelectedRowKeys().length) {
            e.component.selectRowsByIndexes(0);
        }
        this.CD.detectChanges();
    }

    selectionChanged(e): void {
        e.component.collapseAll(-1);
        e.component.expandRow(e.currentSelectedRowKeys[0]);
        // this.getDetailClaimDoc(e.selectedRowKeys[0]);
        this.CD.detectChanges();
    }

    onFileChanged(e, data): void {
        this.uploadLink = this.url + `&document_type=${data.data.documentCode}`;
        this.CD.detectChanges();
    }

    onFileUploaded(e, data): void {
        const xhttp = e.request;
        
        if (xhttp.readyState === 4 && xhttp.status === 0) {

            notify('Upload file error', 'error', 600);
        } else {

            const response = JSON.parse(e.request.response).data;

            response.map((x, i) => {
                if (this.documentFiles[data.data.documentId]) {
                    this.documentFiles[data.data.documentId].push({
                        id: uuid.v4(),
                        documentId: data.data.documentId, 
                        documentCode: data.data.documentCode, 
                        fileName: x.fileName,
                        fileDownloadUri: x.fileDownloadUri,
                    });
                } else {
                    this.documentFiles[data.data.documentId] = [{
                        id: uuid.v4(),
                        documentId: data.data.documentId, 
                        documentCode: data.data.documentCode, 
                        fileName: x.fileName,
                        fileDownloadUri: x.fileDownloadUri,
                    }];
                }
            });

            this.onDocumentChanged();

            notify('Upload file finished', 'success', 600);
        }
    }

    gridDocContentReady(e): void {
        this.CD.detectChanges();
    }

    selectionChangedHandler(e, detailDoc): void {
        this.deleteDocumentPool[detailDoc.data.documentId] = e.selectedRowsData;

        let multi = 0;
        this.deleteDocumentPool.map(x =>{
            if (x) {
                if (x.length > 0){
                    multi += 1;
                }
            }
        });

        if (multi > 1 || e.selectedRowsData.length > 1) {
            this.isMultiSelected = true;
        } else {
            this.isMultiSelected = false;
        }
    }

    viewUploadedFile(docFile, detailDoc): void {
        if (this.type === 'new') {
            this.fileUploadDataSource = this.documentFiles[detailDoc.data.documentId].map(x => x.documentId === detailDoc.data.documentId && `${environment.api_url}api/v1/uploads/${x.fileName}`);
        } else {
            this.getDocumentFiles(docFile.data.documentUrl, detailDoc.data.claimRegNo);
        }
        
        this.isPopupVisible = true;
    }

    getDocumentFiles = (documentUrl, claimRegNo) => {
        const dataObs = this.DS.readObs(DocumentFile, {
            claim_reg_no: claimRegNo,
            document_url: documentUrl
        });
        const dataRes = dataObs.subscribe(
            (data: DocumentFile[]) => {
                this.fileUploadDataSource = [`${environment.api_url}api/v1/avatar.png`];
                this.CD.detectChanges();
            },
            err => {
                this.fileUploadDataSource = ['assets/images/empty.png'];
                this.CD.detectChanges();
                notify('Failed to retrieve data', 'error', 600);
            }
        );
    }

    onDeleteFile(e): void {
        const result = confirm('Are you sure to delete this file?', 'Delete Confirmation');
        result.then((dialogResult) => {
            if (dialogResult) {
                if (this.type === 'new') {
                    this.deleteLocalDocument(e.data.id, e.data.documentId);
                // } else {
                //     this.deleteDocument(e.data.transactionDocumentFileId);
                }
            } else {
                // notify('File successfully deleted', 'success', 600);
            }
        });
    }

    goBack(stepper: MatStepper): void{
        stepper.previous();
    }

    claimDocChanged(e): void {
        if (this.type === 'view') {
            this.getClaimDocFile(e.key);
        }
    }
    getClaimDocFile(documentId): void {
        const dataObs = this.DS.readObs(ClaimDocFile, {
            transaction_document_id: documentId
        });
        const dataRes = dataObs.subscribe(
            (data: ClaimDocFile[]) => {
                this.documentFiles[documentId] = data['data'];
                this.CD.detectChanges();
            },
            err => {
                notify('Failed to retrieve data', 'error', 600);
            }
        );

        setTimeout(() => {
            this.CD.detectChanges();
        }, 250);
    }

    claimDocReady(e): void {
        setTimeout(() => {
            this.CD.detectChanges();
        }, 500);
    }

    formatDate(date): string {
        return moment(date).format('DD MMMM YYYY HH:mm:ss');
    }

    deleteDocument(transactionDocumentFileId): void {
        const dataObs = this.DS.updateObs(DocumentFile, {
            key: transactionDocumentFileId,
            status: false
        });
        const dataRes = dataObs.subscribe(
            (data: DocumentFile[]) => {
                // this.documentFiles[documentId] = data['data'];
                this.onDocumentChanged();
                notify('File successfully deleted', 'success', 600);
                this.CD.detectChanges();
            },
            err => {
                notify('Failed to delete file', 'error', 600);
            }
        );

        setTimeout(() => {
            this.CD.detectChanges();
        }, 250);
    }

    deleteLocalDocument(id, docId): void {
        const tmp = this.documentFiles[docId].filter((x, i) => x.id !== id);
        this.documentFiles[docId] = tmp;

        this.CD.detectChanges();
    }

    onDocumentChanged(): void {
        this.documentChanged.emit(this.documentFiles);
    }

    deleteMultipleFile(): void {
        // this.deleteLocalDocument(e.data.documentId, e.rowIndex);

        const result = confirm('Are you sure to delete this file?', 'Delete Confirmation');
        result.then((dialogResult) => {
            if (dialogResult) {
                this.deleteDocumentPool.map((x, i) => {
                    if (x){
                        x.map(y => {
                            this.deleteLocalDocument(y.id, i);
                        });
                    }
                });
            } else {
                // notify('File successfully deleted', 'success', 600);
            }
        });
    }
    getTranslationText(key) {
        let tmp = '';
        this.translate.get(key).subscribe((res: string) => {
            tmp = res
        });
        return tmp;
    }

    refresh(): void {
        this.CD.detectChanges();
    }

}
