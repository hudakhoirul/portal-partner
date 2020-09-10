import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IClaimStatus extends IDatabaseObj{
    claimStatusId: number;
    claimStatusCode: string;
    statusName: string;
    isDelete: boolean;
}

export class ClaimStatus implements IClaimStatus{
    static tableName: string = TableMap.ClaimStatus; 
    claimStatusId: number;
    claimStatusCode: string;
    statusName: string;
    isDelete: boolean;
    id: number;
    

    constructor(props: IClaimStatus) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
