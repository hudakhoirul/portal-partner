import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IBank extends IDatabaseObj{
    bankCode: string;
    bankId: string;
    bankName: string;
    isDelete: boolean;
    statusDescription: string;
}

// export interface IBankData extends IDatabaseObj{
//     bankCode: string;
//     bankId: string;
//     bankName: string;
//     isDelete: boolean;
//     statusDescription: string;

// }

export class Bank implements IBank{
    static tableName: string = TableMap.Bank; 
    bankCode: string;
    bankId: string;
    bankName: string;
    isDelete: boolean;
    statusDescription: string;
    

    constructor(props: IBank) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
