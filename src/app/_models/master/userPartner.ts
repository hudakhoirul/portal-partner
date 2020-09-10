import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IUserPartner extends IDatabaseObj{
    name: string;
    group: string;
    userName:string;
    email: string;
    password: string;
}

export class UserPartner implements IUserPartner{
    static tableName: string = TableMap.UserPartner; 
    name: string;
    group: string;
    userName:string;
    email: string;
    password: string;
    isDeleted: boolean;
    id: number;    
    

    constructor(props: IUserPartner) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
