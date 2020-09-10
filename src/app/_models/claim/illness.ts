import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IIllness extends IDatabaseObj {
    illnessId: number;
    illnessCode: string;
    name: string;
    statusDescription: string;
    isDeleted: boolean;
}

export class Illness implements IIllness {
    static tableName: string = TableMap.Illness;
    illnessId: number;
    illnessCode: string;
    name: string;
    statusDescription: string;
    isDeleted: boolean;

    constructor(props: IIllness) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
