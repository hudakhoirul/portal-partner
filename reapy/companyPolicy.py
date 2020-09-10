import urllib, json, csv
url = "http://localhost:3000/company_policy"
response = urllib.urlopen(url)
data = json.loads(response.read())
with open('company_policy.csv',mode='w') as csv_file:
    csv_writer = csv.writer(csv_file,delimiter=';',quotechar='"')
    csv_writer.writerow(['id','name','policy_no','source_id','company_id','flow_id','edits_form_setting'])
    for info in data:
        # if(info['parent']):
        #     parent = info['parent']['id']
        # else:
        #     parent = 0
        csv_writer.writerow([info['id'],info['name'],info['policyNo'],info['sourcePolicy']['id'],info['company']['id'],info['claimFlow']['id'],info['editsFormSetting']])
print data