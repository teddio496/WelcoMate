import csv
import requests
from bs4 import BeautifulSoup
from urllib.parse import quote

def fetch_image_urls(query, max_links_to_fetch=5):
    search_url = f"https://www.google.com/search?q={quote(query)}&tbm=isch"
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(search_url, headers=headers)
    soup = BeautifulSoup(response.text, 'html.parser')
    image_urls = []
    
    for img in soup.find_all("img", limit=max_links_to_fetch):
        img_url = img.get("data-src") or img.get("src")
        if img_url and img_url.startswith("http"):
            try:
                img_response = requests.get(img_url, timeout=5)
                if img_response.status_code == 200:
                    image_urls.append(img_url)
                    break  
            except:
                continue
    
    return image_urls

def scrape_image_urls_from_csv(csv_file_path):
    rows = []
    with open(csv_file_path, newline='') as csvFile:
        reader = csv.reader(csvFile)
        header = next(reader)
        header.append("imageLink")  # Add a column for the first working image
        rows.append(header)
        
        for row in reader:
            attraction_name = row[1] + " " + row[2] # title & address of the attraction
            image_urls = fetch_image_urls(attraction_name)
            if image_urls:
                print(f"{attraction_name}: {image_urls[0]}")
                row.append(image_urls[0])
            else:
                row.append("NONE")
            rows.append(row)
    
    with open(csv_file_path, 'w', newline='') as csvFile:
        writer = csv.writer(csvFile)
        writer.writerows(rows)

if __name__ == "__main__":
    csv_file_path = 'toronto_attractions.csv'
    scrape_image_urls_from_csv(csv_file_path)