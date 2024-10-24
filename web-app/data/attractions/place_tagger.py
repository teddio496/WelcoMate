from keybert import KeyBERT
import pandas as pd
import numpy as np
from nltk.corpus import stopwords

dataset = pd.read_csv("toronto_attractions.csv")
tags_col = []

# Iterate over each row in the 'Address' column
stop_words = set(stopwords.words('english'))  # Get stop words once, outside the loop
for row in dataset['description']:
    # words = [word.lower().translate(str.maketrans('', '', string.punctuation)) for word in str(row).split(" ")]  # Handle NaNs by converting row to string
    # tags = ",".join([word for word in words if word not in stop_words][:20])
    # tags_col.append(tags)

    kw_model = KeyBERT()
    keywords = kw_model.extract_keywords(row,top_n=10)
    arr = [tup[0] for tup in keywords]
    st = ",".join(arr)
    tags_col.append(st)
    print(st)

# Convert tags_col to a numpy array if necessary (pandas handles lists well)
# Add it as a new column to the DataFrame
dataset['tags'] = tags_col

# Print the DataFrame with the new 'Tags' column
print(dataset.head())

# Save the modified DataFrame to a new CSV if needed
dataset.to_csv("toronto_attractions_data_with_tags.csv", index=False)