import urllib, json, csv
url = "http://localhost:3000/policy_claim_auto"
response = urllib.urlopen(url)
data = json.loads(response.read())
with open('policy_claim_auto.csv',mode='w') as csv_file:
    csv_writer = csv.writer(csv_file,delimiter=';',quotechar='"')
    csv_writer.writerow(['id','claim_id','claim_type'])
    for info in data:
        # if(info['parent']):
        #     parent = info['parent']['id']
        # else:
        #     parent = 0
        csv_writer.writerow([info['id'],info['claim']['id'],info['claimType']['id']])
print data