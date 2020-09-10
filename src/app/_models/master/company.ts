import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface ICompany extends IDatabaseObj{
    name: string;
    code: string;
}

export class Company implements ICompany{
    static tableName: string = TableMap.Company; 
    name: string;
    code: string;
    isDeleted:boolean;
    id: number;    
    

    constructor(props: ICompany) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
