import urllib, json, csv
url = "http://localhost:3000/app"
response = urllib.urlopen(url)
data = json.loads(response.read())
with open('app.csv',mode='w') as csv_file:
    csv_writer = csv.writer(csv_file,delimiter=';',quotechar='"')
    csv_writer.writerow(['id','name'])
    for info in data:
        csv_writer.writerow([info['id'],info['name']])
print data