import urllib, json, csv
url = "http://localhost:3000/status_claim"
response = urllib.urlopen(url)
data = json.loads(response.read())
with open('status_claim.csv',mode='w') as csv_file:
    csv_writer = csv.writer(csv_file,delimiter=';',quotechar='"')
    csv_writer.writerow(['id','code','name'])
    for info in data:
        # if(info['parent']):
        #     parent = info['parent']['id']
        # else:
        #     parent = 0
        csv_writer.writerow([info['id'],info['code'],info['name']])
print data