import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface ISourcePolicy extends IDatabaseObj{
    name: string;
    code: string;
}

export class SourcePolicy implements ISourcePolicy{
    static tableName: string = TableMap.SourcePolicy; 
    name: string;
    code: string;
    id: number;    
    

    constructor(props: ISourcePolicy) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
