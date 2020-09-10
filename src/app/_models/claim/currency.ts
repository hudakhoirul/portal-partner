import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface ICurrency extends IDatabaseObj {
    id: number;
    code: string;
    description: string;
    statusId: number;
    statusDescription: string;
    isDeleted: boolean;
}

export class Currency implements ICurrency {
    static tableName: string = TableMap.Currency;
    id: number;
    code: string;
    description: string;
    statusId: number;
    statusDescription: string;
    isDeleted: boolean;

    constructor(props: ICurrency) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
