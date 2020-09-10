import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IClaimFlowType extends IDatabaseObj{
    claimFlow: string;
    flowType: string;
    isFlowExist: boolean;
    isEditInformation: boolean;
    isEditDocument: boolean;
    isCheckDocument: boolean;
    isInputAmount: boolean;
}

export class ClaimFlowType implements IClaimFlowType{
    static tableName: string = TableMap.ClaimFlowType; 
    claimFlow: string;
    flowType: string;
    isFlowExist: boolean;
    isEditInformation: boolean;
    isEditDocument: boolean;
    isCheckDocument: boolean;
    isInputAmount: boolean;
    isDeleted: boolean;
    id: number;    
    

    constructor(props: IClaimFlowType) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
