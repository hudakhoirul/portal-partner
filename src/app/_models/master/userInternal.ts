import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IUserInternal extends IDatabaseObj{
    group:string;
    username:string;
    viewAllCompany: boolean;
}

export class UserInternal implements IUserInternal{
    static tableName: string = TableMap.UserInternal; 
    group:string;
    username:string;
    isDeleted: boolean;
    viewAllCompany: boolean;
    id: number;    
    

    constructor(props: IUserInternal) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
