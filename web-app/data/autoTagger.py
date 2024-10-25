from keybert import KeyBERT
import pandas as pd
import numpy as np

import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords

def tag(csv_file):
    dataset = pd.read_csv(csv_file)
    tags_col = []

    stop_words = set(stopwords.words('english')) 

    for row in dataset['description']:
        kw_model = KeyBERT()
        keywords = kw_model.extract_keywords(str(row), top_n=10)
        filtered_keywords = [kw[0] for kw in keywords if kw[0].lower() not in stop_words]
        tags = ",".join(filtered_keywords)
        tags_col.append(tags)
        print(tags)

    dataset['tags'] = tags_col

    print(dataset.head())

    dataset.to_csv(csv_file, index=False)

if __name__ == '__main__':
    # tag("attractions/toronto.csv")
    tag("restaurants/restaurants.csv")