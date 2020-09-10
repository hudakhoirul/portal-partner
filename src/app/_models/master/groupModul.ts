import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IGroupModul extends IDatabaseObj{
    group: string;
    modul: string;
}

export class GroupModul implements IGroupModul{
    static tableName: string = TableMap.GroupModul; 
    group: string;
    modul: string; 
    

    constructor(props: IGroupModul) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
