import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IPolicyClaimDocument extends IDatabaseObj{
    documentType: string;
    claimId: string;
    condition: boolean;
    isCopyParent: boolean;
}

export class PolicyClaimDocument implements IPolicyClaimDocument{
    static tableName: string = TableMap.PolicyClaimDocument; 
    documentType: string;
    claimId: string;
    condition: boolean;
    isCopyParent: boolean;
    id: number;    
    

    constructor(props: IPolicyClaimDocument) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
