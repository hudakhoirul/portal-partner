import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IApp extends IDatabaseObj{
    name: string;

}

export class App implements IApp{
    static tableName: string = TableMap.App; 
    name: string;
    id: number;    
    

    constructor(props: IApp) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
