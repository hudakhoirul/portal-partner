import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IAuth extends IDatabaseObj{
    token: string;
}

export class Auth implements IAuth{
    static tableName: string = TableMap.Auth; 
    token: string;

    constructor(props: IAuth) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
