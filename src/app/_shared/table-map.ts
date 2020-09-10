const prefix = 'api/v1/';

export class TableMap{
    static Group = prefix + 'group';
    static Modul = prefix + 'modules';
    static GroupModul = prefix + 'group';
    static App = prefix + 'application';
    static UserInternal = prefix + 'user-internal';
    static UserCompany = prefix + 'user-company';
    static UserPartner = prefix + 'user-partner';
    static Company = prefix + 'company';
    static CompanyPolicy = prefix + 'company-policies';
    static SourcePolicy = prefix + 'source-policies';
    static CompanyClaim = prefix + 'company-claims';
    static PolicyClaimAuto = prefix + 'policy-claim-auto';
    static PolicyClaimDocument = prefix + 'policy-claim-documents';
    static ClaimFlow = prefix + 'claim-flow';
    // static StatusClaim = prefix + 'status-claim';
    static ClaimFlowType = prefix + 'claim-flow-types';
    static Illness = prefix + 'ex/illness';
    static Currency = prefix + 'ex/currency';
    static DocumentType = prefix + 'ex/DocumentType';
    static ClaimType = prefix + 'ex/claim-types';
    static Policy = prefix + 'ex/insured';
    static Relation = prefix + 'ex/relation-insured';
    static ClaimPartner = prefix + 'ex/claim-partners';
    static ClaimDoc = prefix + 'ex/claim-documents';
    static ClaimDocFile = prefix + 'ex/claim-document-files';
    static ClaimHistoryProcess = prefix + 'ex/claim-history-process';
    static Bank = prefix + 'ex/banks';
    static ClaimStatus = prefix + 'ex/claim-status';
    static Form = prefix + 'ex/eforms';
    static Dashboard = prefix + 'dashboards';
    static Auth = 'login';
    static Upload = prefix + 'uploads';
    static Claim = prefix + 'ex/claims';
    static Document = prefix + 'ex/documents';
    static DocumentFiles = prefix + 'ex/documents-files';
    
}
