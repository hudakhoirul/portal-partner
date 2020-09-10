import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IClaimType extends IDatabaseObj{
    type: string;
}

export class ClaimType implements IClaimType{
    static tableName: string = TableMap.ClaimType; 
    type: string;
    isDeleted:boolean;
    id: number;
    

    constructor(props: IClaimType) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
