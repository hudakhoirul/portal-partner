import urllib, json, csv
url = "http://localhost:3000/claim_flow"
response = urllib.urlopen(url)
data = json.loads(response.read())
with open('claim_flow.csv',mode='w') as csv_file:
    csv_writer = csv.writer(csv_file,delimiter=';',quotechar='"')
    csv_writer.writerow(['id','name'])
    for info in data:
        # if(info['parent']):
        #     parent = info['parent']['id']
        # else:
        #     parent = 0
        csv_writer.writerow([info['id'],info['name']])
print data