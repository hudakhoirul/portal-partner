import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IPolicy extends IDatabaseObj{
    currency: string;
    dateOfBirth: string;
    email: string;
    idMemberPartner: string;
    insurancePeriodFrom: string;
    insurancePeriodTo: string;
    insuredName: string;
    insuredNo: string;
    ktpNo: string;
    phoneNo: string;
    policyNo: string;
    productName: string;
    sumAssured: string;
    virtualAccount: string;
}

export class Policy implements IPolicy{
    static tableName: string = TableMap.Policy; 
    currency: string;
    dateOfBirth: string;
    email: string;
    idMemberPartner: string;
    insurancePeriodFrom: string;
    insurancePeriodTo: string;
    insuredName: string;
    insuredNo: string;
    ktpNo: string;
    phoneNo: string;
    policyNo: string;
    productName: string;
    sumAssured: string;
    virtualAccount: string;
    id: number;
    

    constructor(props: IPolicy) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
