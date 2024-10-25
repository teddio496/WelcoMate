import requests
from bs4 import BeautifulSoup
import csv

def scrape_page(page_number, csv_file, writer):

    url = 'https://streetsoftoronto.com/toronto-restaurants/page/' + str(page_number) + '/'
    print('Scraping page:', url)
    
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        try:
            soup = BeautifulSoup(response.content, 'html.parser')
            listings = soup.find_all('li', class_='wdp-listing-item')

            for listing in listings:

                title_tag = listing.find('h2', class_='listing-title')
                span_tag = title_tag.find('span', class_='wdp-listing-counter')
                if span_tag:
                    span_tag.decompose()
                title = title_tag.get_text(strip=True)

                content = listing.find('div', class_='wdp-listing-content').get_text(strip=True)
                tax_terms_list = listing.find_all('li')
                tax_terms = ', '.join([term.get_text(strip=True) for term in tax_terms_list])
                content = content + ' ' + tax_terms

                if 'closed' in tax_terms.lower():
                    continue

                img_tag = listing.find('img', class_='wp-post-image')
                image_link = img_tag.get('data-lazy-src') if img_tag else ''

                a_tag = listing.find('a', href=True)
                link_url = a_tag['href'] if a_tag else ''

                address = ''
                if link_url != '':
                    detail_response = requests.get(link_url, headers=headers)
                    if detail_response.status_code == 200:
                        detail_soup = BeautifulSoup(detail_response.content, 'html.parser')
                        address_tag = detail_soup.find('div', class_='wdp-listing-address')
                        address = address_tag.get_text(strip=True) if address_tag else ''

                writer.writerow([title, address, content, image_link])
        except Exception as e:
            print(f"An error occurred: {e}")

if __name__ == '__main__':
    csv_file = 'toronto.csv'
    with open(csv_file, mode='a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['title', 'address', 'description', 'imageLink'])
        for i in range(1, 3):
            scrape_page(i, csv_file, writer)