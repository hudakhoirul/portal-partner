import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IProcessHistory extends IDatabaseObj{
    transactionHistoryProcessId: string;
    claimRegNo: string;
    processDate: Date;
    userTypeName: string;
    userPartnerName: string;
    workflowTemplateActionId: string;
    actionDescription: string;
    reasonId: string;
    remarks: string;
}

export class ProcessHistory implements IProcessHistory{
    static tableName: string = TableMap.ClaimHistoryProcess; 
    transactionHistoryProcessId: string;
    claimRegNo: string;
    processDate: Date;
    userTypeName: string;
    userPartnerName: string;
    workflowTemplateActionId: string;
    actionDescription: string;
    reasonId: string;
    remarks: string;
    

    constructor(props: IProcessHistory) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
