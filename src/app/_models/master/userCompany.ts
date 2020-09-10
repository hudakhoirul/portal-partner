import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IUserCompany extends IDatabaseObj{
    user: string;
    company: string;
}

export class UserCompany implements IUserCompany{
    static tableName: string = TableMap.UserCompany; 
    user: string;
    company: string;
    

    constructor(props: IUserCompany) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
