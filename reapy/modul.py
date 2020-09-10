import urllib, json, csv
url = "http://localhost:3000/modul"
response = urllib.urlopen(url)
data = json.loads(response.read())
with open('modul.csv',mode='w') as csv_file:
    csv_writer = csv.writer(csv_file,delimiter=';',quotechar='"')
    csv_writer.writerow(['id','name','app_id','is_parent','parent','icon','uri','is_view','is_add','is_edit'])
    for info in data:
        if(info['parent']):
            parent = info['parent']['id']
        else:
            parent = 0
        csv_writer.writerow([info['id'],info['name'],info['appId']['id'],info['isParent'],parent,info['icon'],info['uri'],info['isView'],info['isAdd'],info['isEdit']])
print data