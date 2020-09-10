import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IDashboard extends IDatabaseObj {
    draft: number;
    documentCheck: number;
    revision: number;
    waiting: number;
    process: number;
}

export class Dashboard implements IDashboard {
    static tableName: string = TableMap.Dashboard;
    draft: number;
    documentCheck: number;
    revision: number;
    waiting: number;
    process: number;

    constructor(props: IDashboard) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
