const Faker = require('faker')

const modul = [];
const group = [];
const app = [];
const group_modul = [];
const user_internal = [];
const user_company = [];
const user_partner = [];
const company = [];
const status_claim = [];
const claim_type = [];
const policy_claim_auto = [];
const policy_claim_document = [];
const company_claim = [];
const company_policy = [];
const source_policy = [];
const claim_flow = [];
const claim_flow_type = [];
const illness = [
    {
        illnessId: 2,
        illnessCode: 'ILLN190002',
        name: 'Hipertensi',
        statusDescription: 'Active',
        isDelete: 0
    }
];
const currency = [
    {
        currencyId: 1,
        currencyCode: 'IDR',
        description: 'Indonesian Rupiah',
        statusId: 5,
        statusDescription: 'Active',
        isDelete: '0'
    },
    {
        currencyId: 2,
        currencyCode: 'USD',
        description: 'US Dollar',
        statusId: 5,
        statusDescription: 'Active',
        isDelete: '0'
    },
    {
        currencyId: 3,
        currencyCode: 'EUR',
        description: 'EURO',
        statusId: 5,
        statusDescription: 'Active',
        isDelete: '0'
    },
    {
        currencyId: 7,
        currencyCode: 'SGD',
        description: 'Dollar SIngapore',
        statusId: 5,
        statusDescription: 'Active',
        isDelete: '0'
    }
]
for(var i=0;i<50;i++){
    user_internal.push({
        id:i+1,
        groupId:Faker.random.number(30),
        username:Faker.internet.userName(),
        isDeleted: Faker.random.number({min:0,max:1})==0?false:true,
        viewAllCompany: Faker.random.number({min:0,max:1})==0?false:true,
    })
}
for(var i=0;i<50;i++){
    app.push({
        id:i+1,
        name:Faker.internet.domainWord()
    })
}
for(var i=0;i<50;i++){
    var isParent = (modul.length>10&&Faker.random.number({min:0,max:1})==0)?false:true
    modul.push({
        id:i+1,
        appId:app[Faker.random.number(app.length-1)],
        name:Faker.finance.accountName(),
        isParent: isParent,
        parent:isParent==false?modul[Faker.random.number(modul.length-1)]:null,
        icon:Faker.internet.userAgent(),
        uri:Faker.internet.url(),
        isView:Faker.random.number({min:0,max:1})==0?false:true,
        isAdd:Faker.random.number({min:0,max:1})==0?false:true,
        isEdit:Faker.random.number({min:0,max:1})==0?false:true,
        createdBy: user_internal[Faker.random.number(user_internal.length-1)],
        createdDate: Faker.date.past(),
        isDeleted: false,
        modifiedBy:null,
        modifiedDate: null
    })
}
for(var i=0;i<50;i++){
    group.push({
        id:i+1,
        name: Faker.finance.currencyName(),
        status: Faker.random.number({min:0,max:1})==0?false:true,
        createdBy: user_internal[Faker.random.number(user_internal.length-1)],
        createdDate: Faker.date.past(),
        isDeleted: false,
        modifiedBy:null,
        modifiedDate: null
    })
}
for(var i=0;i<50;i++){
    group_modul.push({
        group: group[Faker.random.number(group.length-1)],
        modul: modul[Faker.random.number(modul.length-1)]
    })
}
for(var i=0;i<50;i++){
    company.push({
        id:i+1,
        code: Faker.random.alphaNumeric(15),
        name: Faker.company.companyName(),
        createdBy: user_internal[Faker.random.number(user_internal.length-1)],
        createdDate: Faker.date.past(),
        isDeleted: false,
        modifiedBy:null,
        modifiedDate: null
    })
}
for(var i=0;i<50;i++){
    user_partner.push({
        id:i+1,
        name: Faker.name.firstName(),
        group: group[Faker.random.number(group.length-1)],
        company: group[Faker.random.number(company.length-1)],
        userName:Faker.internet.userName(),
        email: Faker.internet.email(),
        password: Faker.internet.password(),
        createdBy: user_internal[Faker.random.number(user_internal.length-1)],
        createdDate: Faker.date.past(),
        isDeleted: false,
        modifiedBy:null,
        modifiedDate: null
    })
}
for(var i=0;i<50;i++){
    user_company.push({
        user: user_internal[Faker.random.number(user_internal.length-1)],
        company: company[Faker.random.number(company.length-1)],
    })
}
for(var i=0;i<50;i++){
    source_policy.push({
        id: i+1,
        name:Faker.internet.domainWord(),
        code:Faker.random.number(100)
    })
}
for(var i=0;i<50;i++){
    status_claim.push({
        id: i+1,
        name:Faker.internet.domainWord(),
        code:Faker.random.alphaNumeric(100)
    })
}
for(var i=0;i<50;i++){
    claim_flow.push({
        id: i+1,
        name:Faker.internet.domainName(),
        isDeleted:false
    })
}
for(var i=0;i<50;i++){
    claim_flow_type.push({
        id: i+1,
        claimFlow: claim_flow[Faker.random.number(claim_flow.length-1)],
        flowType:Faker.internet.domainName(),
        isFlowExist:Faker.random.number({min:0,max:1})==0?false:true,
        isEditInformation:Faker.random.number({min:0,max:1})==0?false:true,
        isEditDocument:Faker.random.number({min:0,max:1})==0?false:true,
        isCheckDocument:Faker.random.number({min:0,max:1})==0?false:true,
        isInputAmount:Faker.random.number({min:0,max:1})==0?false:true,
        isDeleted:false
    })
}
for(var i=0;i<50;i++){
    company_policy.push({
        id: i+1,
        sourcePolicy: source_policy[Faker.random.number(source_policy.length-1)],
        claimFlow: claim_flow[Faker.random.number(claim_flow.length-1)],
        company: company[Faker.random.number(company.length-1)],
        name:Faker.name.lastName()+Faker.name.firstName(),
        policyNo:Faker.random.alphaNumeric(20),
        editsFormSetting: Faker.random.number(100),
        status:Faker.random.number({min:0,max:1})==0?false:true,
        createdBy: user_internal[Faker.random.number(user_internal.length-1)],
        createdDate: Faker.date.past(),
        isDeleted: false,
        modifiedBy:null,
        modifiedDate: null
    })
}
for(var i=0;i<50;i++){
    claim_type.push({
        id: i+1,
        type: Faker.internet.domainName(),
        isDeleted:false
    })
}
for(var i=0;i<50;i++){
    company_claim.push({
        id: i+1,
        companyPolicy: company_policy[Faker.random.number(company_policy.length-1)],
        claimType: claim_type[Faker.random.number(claim_type.length-1)],
        isUsedByCustomer:Faker.random.number({min:0,max:1})==0?false:true,
        isExpired:Faker.random.number({min:0,max:1})==0?false:true,
        expiredDays: Faker.random.number(100),
        isTrigger:Faker.random.number({min:0,max:1})==0?false:true,
        isNeedBenefiecyInfo:Faker.random.number({min:0,max:1})==0?false:true,
        isNeedBankInsured:Faker.random.number({min:0,max:1})==0?false:true,
        createdBy: user_internal[Faker.random.number(user_internal.length-1)],
        createdDate: Faker.date.past(),
        isDeleted: false,
        modifiedBy:null,
        modifiedDate: null
    })
}
for(var i=0;i<50;i++){
    policy_claim_document.push({
        id: i+1,
        documentType: claim_type[Faker.random.number(claim_type.length-1)],
        claim: company_claim[Faker.random.number(company_claim.length-1)],
        code: Faker.random.alphaNumeric(15),
        condition:Faker.random.number({min:0,max:1})==0?false:true,
        isCopyParent:Faker.random.number({min:0,max:1})==0?false:true,
        status:Faker.random.number({min:0,max:1})==0?false:true,
        isDeleted: false
    })
}
for(var i=0;i<50;i++){
    policy_claim_auto.push({
        id: i+1,
        claimType: claim_type[Faker.random.number(claim_type.length-1)],
        claim: company_claim[Faker.random.number(company_claim.length-1)],
        isDeleted: false
    })
}
// const atoo = (array,label) => array.reduce((obj, item) => {
//   var key = array.indexOf(item);
//   let data = {};
//   data['id'] = key+1;
//   data[label] = item
//   obj[key] = data
//   return obj
// }, []);

module.exports = () => {
    var db = {};
    var user = user_internal.map(data=>{
        data.group=group[data.groupId].name;
        return data;
    })
    db.modul = modul;
    db.group = group;
    db.app = app;
    db.group_modul = group_modul;
    db.user_internal = user;
    db.user_company = user_company;
    db.user_partner = user_partner;
    db.company = company;
    db.status_claim = status_claim;
    db.claim_type = claim_type;
    db.policy_claim_auto = policy_claim_auto;
    db.policy_claim_document = policy_claim_document;
    db.company_claim = company_claim;
    db.company_policy = company_policy;
    db.source_policy = source_policy;
    db.claim_flow = claim_flow;
    db.claim_flow_type = claim_flow_type;
    db.illness = illness;
    db.currency = currency;

    return db;
}