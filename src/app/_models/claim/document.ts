import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IDocument extends IDatabaseObj{
    documentId: string;
    documentCode: string;
    description: string;
    remarks: string;
    isDelete: string;


}

export class Document implements IDocument{
    static tableName: string = TableMap.Document; 
    
    documentId: string;
    documentCode: string;
    description: string;
    remarks: string;
    isDelete: string;
    id: number;
    constructor(props: IDocument) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
