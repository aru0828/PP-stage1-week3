import urllib.request
import json
url = 'https://padax.github.io/taipei-day-trip-resources/taipei-attractions.json'

req =  urllib.request.Request(url)
with urllib.request.urlopen(req) as response:
    data = response.read()
    data = json.loads(data)
    vlists = data['result']['results']

with open('Q1.txt', mode='w', encoding='utf-8') as txtFile:
    for vlist in vlists:
        imgUrl = vlist['file'].find('.jpg')
        imgUrl = vlist['file'][0:imgUrl+4]
        text = f"{vlist['stitle']}, {vlist['longitude']}, {vlist['latitude']}, {imgUrl}"
        txtFile.write(f"{text}\n")
