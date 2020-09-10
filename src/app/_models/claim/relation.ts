import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IRelation extends IDatabaseObj{
    relationInsuredId: string;
    relationInsuredCode: string;
    relationInsuredName: string;
    isDelete: string;

}

export class Relation implements IRelation{
    static tableName: string = TableMap.Relation; 
    relationInsuredId: string;
    relationInsuredCode: string;
    relationInsuredName: string;
    isDelete: string;
    id: number;
    

    constructor(props: IRelation) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
