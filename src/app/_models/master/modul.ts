import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IModul extends IDatabaseObj{
    appId: string;
    name: string;
    isParent: string;
    parent: string;
    icon: string;
    uri: string;
    isView:boolean;
    isAdd:boolean;
    isEdit:boolean;
}

export class Modul implements IModul{
    static tableName: string = TableMap.Modul; 
    appId: string;
    name: string;
    isParent: string;
    parent: string;
    icon: string;
    uri: string;
    isView: boolean;
    isAdd: boolean;
    isEdit: boolean;    
    constructor(props: IModul) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
