const Faker = require('faker');
const Xlsx = require('xlsx');
const _ = require('lodash');
const eDocumentType = require('./dummy/list_eform.json');
const eClaimType = require('./dummy/list_claim_type.json');
const ePolicyAjk = require('./dummy/list_insured_ajk.json');
const ePolicyGrp = require('./dummy/list_insured_grp.json');
const eRelation = require('./dummy/list_relation_insured.json');
const eClaimPartner = require('./dummy/list_claim_partner.json');
const eClaimStatus = require('./dummy/list_claim_status.json');
const illness = [
    {
        illnessId: 2,
        illnessCode: 'ILLN190002',
        name: 'Hipertensi',
        statusDescription: 'Active',
        isDelete: 0
    }, {
        illnessId: 9999,
        illnessCode: 'Other',
        name: 'Other',
        statusDescription: 'Active',
        isDelete: 0
    }
];

const bank = {
    "data": [
        {
          "bankCode": "string",
          "bankId": 0,
          "bankName": "string",
          "isDelete": 0,
          "statusDescription": "string"
        }, 
        {
          "bankCode": "other",
          "bankId": 9999,
          "bankName": "Other",
          "isDelete": 0,
          "statusDescription": "Other"
        }
    ],
    "message": "string",
    "ok": true
  };

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

const workbook = Xlsx.readFile('./dummy/dummy.xlsx');
const sheetList = workbook.SheetNames;
const db = {}

sheetList.forEach(function(y) {
    var worksheet = workbook.Sheets[y];
    var headers = {};
    var data = [];
    for(z in worksheet) {
        if(z[0] === '!') continue;
        //parse out the column, row, and value
        var tt = 0;
        for (var i = 0; i < z.length; i++) {
            if (!isNaN(z[i])) {
                tt = i;
                break;
            }
        };
        var col = z.substring(0,tt);
        var row = parseInt(z.substring(tt));
        var value = worksheet[z].v;

        //store header names
        if(row == 1 && value) {
            headers[col] = _.camelCase(value);
            continue;
        }
        if(value=="True" || value=="true"){
            value=true;
        }
        if(value=="False" || value=="false"){
            value=false;
        }

        if(!data[row]) data[row]={};
        data[row][headers[col]] = value;
    }
    //drop those first two rows which are empty
    data.shift();
    data.shift();
    db[y.split('_').join('-')]=data;
    // console.log(data);
});
const camelCaseData = (data)=>{
    return data.map(data=>{
        let keys = Object.keys(data);
        for(var key in keys){
            if(keys[key].indexOf('_')>-1){
                data[_.camelCase(keys[key])]=data[keys[key]];
                delete(data[keys[key]])
            }
        }
        return data;
    })
}
module.exports = () => {
    // var db = {};
    db['claim-document-file'] = [{
        id:1,
        doc_id:1,
        filename: Faker.system.fileName(),
        upload_date: Date.now(),
        upload_by:1
    }];
    db.ex.DocumentType = camelCaseData(eDocumentType.data);
    db.ex.ClaimType = camelCaseData(eClaimType.data);
    db.ex.Policy = camelCaseData(ePolicyAjk.data.concat(ePolicyGrp.data));
    db.ex.Relation = camelCaseData(eRelation.data);
    db.ex.ClaimPartner = camelCaseData(eClaimPartner.data).map(data=>({...data,id:data.partner}));
    db.ex['claim-status'] = camelCaseData(eClaimStatus.data)
    for(var i=0;i<Faker.random.number({min:20,max:50});i++){
        let claimStatus = Faker.random.arrayElement(db.eClaimStatus)
        db.eClaimPartner.push({
            source_app_id: 5,
            transaction_form_id: "431",
            transaction_id: "692",
            claim_reg_no: "CL190500042",
            partner: db.eClaimPartner.length+1,
            id_member_partner: Faker.random.alphaNumeric(10),
            policy_no: "POLICY_PT_001",
            product: null,
            participant: null,
            participant_no: null,
            virtual_account: null,
            start_date: null,
            finish_date: null,
            id_currency_policy: null,
            sum_assured: null,
            phone_no1: Faker.phone.phoneNumber(),
            phone_no2: null,
            email_address: Faker.internet.email(),
            event_date: Faker.date.past(),
            claim_type_code: "CLTY190001",
            claim_type_name: "Death",
            claim_status_code: claimStatus.claimStatusCode,
            claim_status_name: claimStatus.claimStatusName,
            currency: "IDR",
            claim_amount: Faker.random.number(100)*10000,
            illness_code: "ILLN190002",
            illness_name: "Hipertensi",
            illness_text: null,
            beneficiery: "PT Equity Life Indonesia",
            beneficiery_ktp_no: "KTP 0000001",
            relationship: "REL02",
            relation_insured_code: "REL02",
            partner_relation_text: null,
            partner_family_card_no: "KK0001",
            partner_account_name: "ELI",
            partner_account_no: "1200012111",
            partner_currency: "IDR",
            partner_bank: "BANK190002",
            partner_bank_name: "Bank Mandiri",
            partner_bank_text: null,
            id_user_partner: null,
            id_user_partner_mod: null,
            id_transaction_parent: null,
            created_by: "FMJ",
            created_date: "2019-05-21 15:29:24.670",
            modified_by: "FMJ",
            modified_date: "2019-05-21 15:29:24.670",
            is_delete: 0
        })
    }
    db.eClaimPartner = camelCaseData(db.eClaimPartner);
    let dashboard = {
        draft: db.eClaimPartner.filter(data=>data.claimStatusCode=='SC001').length,
        documentCheck: db.eClaimPartner.filter(data=>data.claimStatusCode=='SC002').length,
        revision: db.eClaimPartner.filter(data=>data.claimStatusCode=='SC003').length,
        waiting: db.eClaimPartner.filter(data=>data.claimStatusCode=='SC004').length,
        process: db.eClaimPartner.filter(data=>data.claimStatusCode=='SC005').length,
    };
    db.eIllness = illness;
    db.banks = bank;
    db.eCurrency = currency.map((data,index)=>({...data,id:index+1}));
    db.dashboard = dashboard;
    // console.log(db);

    return db;
}