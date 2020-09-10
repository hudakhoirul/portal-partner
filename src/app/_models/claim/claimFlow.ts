import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IClaimFlow extends IDatabaseObj{
    name: string;

}

export class ClaimFlow implements IClaimFlow{
    static tableName: string = TableMap.ClaimFlow; 
    name: string;
    isDeleted: boolean;
    id: number;    
    

    constructor(props: IClaimFlow) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
