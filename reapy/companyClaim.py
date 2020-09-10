import urllib, json, csv
url = "http://localhost:3000/company_claim"
response = urllib.urlopen(url)
data = json.loads(response.read())
with open('company_claim.csv',mode='w') as csv_file:
    csv_writer = csv.writer(csv_file,delimiter=';',quotechar='"')
    csv_writer.writerow(['id','policy_id','claim_type','is_user_by_customer','is_expired','expired_days','is_trigger','is_need_benefiecy_info','is_need_bank_insured'])
    for info in data:
        # if(info['parent']):
        #     parent = info['parent']['id']
        # else:
        #     parent = 0
        csv_writer.writerow([info['id'],info['companyPolicy']['id'],info['claimType']['id'],info['isUsedByCustomer'],info['isExpired'],info['expiredDays'],info['isTrigger'],info['isNeedBenefiecyInfo'],info['isNeedBankInsured']])
print data