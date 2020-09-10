import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface ICompanyPolicy extends IDatabaseObj{
    sourcePolicy: string;
    claimFlow: string;
    company: string;
    policyNo: string;
    editsFormSetting: string;
    status:boolean;
}

export class CompanyPolicy implements ICompanyPolicy{
    static tableName: string = TableMap.CompanyPolicy; 
    sourcePolicy: string;
    claimFlow: string;
    company: string;
    policyNo: string;
    editsFormSetting: string;
    status:boolean;
    isDeleted: boolean;
    id: number;    
    

    constructor(props: ICompanyPolicy) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
