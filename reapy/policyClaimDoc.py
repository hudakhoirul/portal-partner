import urllib, json, csv
url = "http://localhost:3000/policy_claim_document"
response = urllib.urlopen(url)
data = json.loads(response.read())
with open('policy_claim_doc.csv',mode='w') as csv_file:
    csv_writer = csv.writer(csv_file,delimiter=';',quotechar='"')
    csv_writer.writerow(['id','claim_id','document_type','code','condition','is_copy_parent'])
    for info in data:
        # if(info['parent']):
        #     parent = info['parent']['id']
        # else:
        #     parent = 0
        csv_writer.writerow([info['id'],info['claim']['id'],info['documentType']['id'],info['code'],info['condition'],info['isCopyParent']])
print data