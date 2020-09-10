import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface ICompanyClaim extends IDatabaseObj{
    companyPolicy: string;
    claimType: string;
    isUsedByCustomer:boolean;
    isExpired:boolean;
    expiredDays: number;
    isTrigger:boolean;
    needBeneficiaryInfo:boolean;
    needBankInsured:boolean;
}

export class CompanyClaim implements ICompanyClaim{
    static tableName: string = TableMap.CompanyClaim; 
    companyPolicy: string;
    claimType: string;
    isUsedByCustomer:boolean;
    isExpired:boolean;
    expiredDays: number;
    isTrigger:boolean;
    needBeneficiaryInfo:boolean;
    needBankInsured:boolean;
    isDeleted:boolean;
    id: number;    
    

    constructor(props: ICompanyClaim) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
