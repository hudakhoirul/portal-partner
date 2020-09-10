import urllib, json, csv
url = "http://localhost:3000/claim_flow_type"
response = urllib.urlopen(url)
data = json.loads(response.read())
with open('claim_flow_type.csv',mode='w') as csv_file:
    csv_writer = csv.writer(csv_file,delimiter=';',quotechar='"')
    csv_writer.writerow(['id','claim_flow_id','flow_type','is_flow_exist','is_edit_information','is_edit_document','is_check_document','is_input_amount'])
    for info in data:
        # if(info['parent']):
        #     parent = info['parent']['id']
        # else:
        #     parent = 0
        csv_writer.writerow([info['id'],info['claimFlow']['id'],info['flowType'],info['isFlowExist'],info['isEditInformation'],info['isEditDocument'],info['isCheckDocument'],info['isInputAmount']])
print data