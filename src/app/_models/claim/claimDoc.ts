import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IClaimDoc extends IDatabaseObj{
    claimRegNo: number;
    description: number;
    documentCode: number;
    documentId: string;
    eformDocumentId: string;
    eformId: string;
    jumlahFile: string;
    maximumFiles: number;
    minimumFiles: number;
    receiveDocCheck: string;
    remarks: string;
    seqNumber: string;
    statusId: string;
    id: number;
    transactionId: string;


}

export class ClaimDoc implements IClaimDoc{
    static tableName: string = TableMap.ClaimDoc; 
    
    claimRegNo: number;
    description: number;
    documentCode: number;
    documentId: string;
    eformDocumentId: string;
    eformId: string;
    jumlahFile: string;
    maximumFiles: number;
    minimumFiles: number;
    receiveDocCheck: string;
    remarks: string;
    seqNumber: string;
    statusId: string;
    transactionId: string;
    id: number;
    constructor(props: IClaimDoc) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
