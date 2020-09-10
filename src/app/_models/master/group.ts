import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IGroup extends IDatabaseObj{
    name: string;
    status: boolean;

}

export class Group implements IGroup{
    static tableName: string = TableMap.Group; 
    name: string;
    status: boolean;
    isDeleted: boolean;
    id: number;    
    

    constructor(props: IGroup) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
