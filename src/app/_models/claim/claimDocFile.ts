import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IClaimDocFile extends IDatabaseObj{
    documentName: string;
    documentType: string;
    documentTypeId: string;
    documentUrl: string;
    finalDocumentIndex: string;
    finalDocumentName: string;
    finalHascode: string;
    hashCode: string;
    hashcodeOri: string;
    nextFileId: string;
    prevFileId: string;
    token: string;
    transactionDocumentFileId: string;
    transactionDocumentId: string;
    transactionId: string;
    uploadBy: string;
    uploadDate: string;
    uploadDateStr: string;
}

export class ClaimDocFile implements IClaimDocFile{
    static tableName: string = TableMap.ClaimDocFile; 
    documentName: string;
    documentType: string;
    documentTypeId: string;
    documentUrl: string;
    finalDocumentIndex: string;
    finalDocumentName: string;
    finalHascode: string;
    hashCode: string;
    hashcodeOri: string;
    nextFileId: string;
    prevFileId: string;
    token: string;
    transactionDocumentFileId: string;
    transactionDocumentId: string;
    transactionId: string;
    uploadBy: string;
    uploadDate: string;
    uploadDateStr: string;
    

    constructor(props: IClaimDocFile) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
