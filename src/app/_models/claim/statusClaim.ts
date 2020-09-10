import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IStatusClaim extends IDatabaseObj{
    name: string;
    code: string;
}

export class StatusClaim implements IStatusClaim{
    static tableName: string = TableMap.ClaimStatus; 
    name: string;
    code: string;
    id: number;    
    

    constructor(props: IStatusClaim) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
