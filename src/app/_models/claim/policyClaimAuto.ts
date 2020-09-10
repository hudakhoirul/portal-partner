import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IPolicyClaimAuto extends IDatabaseObj{
    claimType: string;
    claim: string;
}

export class PolicyClaimAuto implements IPolicyClaimAuto{
    static tableName: string = TableMap.PolicyClaimAuto; 
    claimType: string;
    claim: string;
    isDeleted: boolean;
    id: number;    
    

    constructor(props: IPolicyClaimAuto) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
