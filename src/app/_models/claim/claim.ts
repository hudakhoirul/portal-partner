import { IDatabaseObj } from "../base";
import { TableMap } from "@app/_shared/table-map";

export interface IClaim extends IDatabaseObj {
    accountBankCode: string;
    accountCurrencyCode: string;
    accountName: string;
    accountNo: string;
    beneficiary: string;
    beneficiaryFamilyCardNo: string;
    beneficiaryKtpNo: string;
    beneficiaryRelationInsuredCode: string;
    claimAmount: string;
    claimCurrencyCode: string;
    claimStatusCode: string;
    claimTypeCode: string;
    claimantEmailAddress: string;
    claimantName: string;
    claimantPhoneNo: string;
    claimantRelationInsuredCode: string;
    documents: Array<any>;
    // : string; documents[0].documentCode
    // : string; documents[0].filename
    eformId: string;
    emailAddress: string;
    eventDate: string;
    idMemberPartner: string;
    illnessCode: string;
    isInsured: string;
    mobileNo: string;
    participant: string;
    participantNo: string;
    periodEndDate: string;
    periodStartDate: string;
    policyNo: string;
    productName: string;
    sourceApp: string;
    sumAssuredAmount: string;
    sumAssuredCurrencyCode: string;
    virtualAccount: string;
    illnessText: string;
    accountBankText: string;
    idUserPartner: string;
    partnerName: string;
}

export class Claim implements IClaim {
    static tableName: string = TableMap.Claim;
    accountBankCode: string;
    accountCurrencyCode: string;
    accountName: string;
    accountNo: string;
    beneficiary: string;
    beneficiaryFamilyCardNo: string;
    beneficiaryKtpNo: string;
    beneficiaryRelationInsuredCode: string;
    claimAmount: string;
    claimCurrencyCode: string;
    claimStatusCode: string;
    claimTypeCode: string;
    claimantEmailAddress: string;
    claimantName: string;
    claimantPhoneNo: string;
    claimantRelationInsuredCode: string;
    documents: Array<any>;
    // : string; documents[0].documentCode
    // : string; documents[0].filename
    eformId: string;
    emailAddress: string;
    eventDate: string;
    idMemberPartner: string;
    illnessCode: string;
    isInsured: string;
    mobileNo: string;
    participant: string;
    participantNo: string;
    periodEndDate: string;
    periodStartDate: string;
    policyNo: string;
    productName: string;
    sourceApp: string;
    sumAssuredAmount: string;
    sumAssuredCurrencyCode: string;
    virtualAccount: string;
    illnessText: string;
    accountBankText: string;
    idUserPartner: string;
    partnerName: string;
    
    constructor(props: IClaim) {
        Object.keys(props).forEach(prop => {
            const value = props[prop];
            this[prop] = value;
        });
    }
}
