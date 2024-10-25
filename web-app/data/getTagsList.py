import csv
import json

tags = set()

with open('restaurants/toronto.csv', mode='r', newline='', encoding='utf-8') as infile:
    reader = csv.DictReader(infile)
    for row in reader:
        tag_list = row['tags'].split(',')
        for tag in tag_list:
            tags.add(tag.strip())

tags_with_prefix = { tag for tag in tags }

with open('restaurants/tags.json', mode='w', encoding='utf-8') as outfile:
    json.dump(list(tags_with_prefix), outfile, ensure_ascii=False, indent=4)