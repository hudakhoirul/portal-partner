import urllib, json, csv
url = "http://localhost:3000/user_partner"
response = urllib.urlopen(url)
data = json.loads(response.read())
with open('user_partner.csv',mode='w') as csv_file:
    csv_writer = csv.writer(csv_file,delimiter=';',quotechar='"')
    csv_writer.writerow(['id','name','user_name','group_id','company_id','email','password'])
    for info in data:
        # if(info['parent']):
        #     parent = info['parent']['id']
        # else:
        #     parent = 0
        csv_writer.writerow([info['id'],info['name'],info['userName'],info['group']['id'],info['company']['id'],info['email'],info['password']])
print data