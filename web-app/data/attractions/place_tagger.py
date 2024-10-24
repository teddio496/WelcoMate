import pandas as pd
import numpy as np
import string

from nltk.corpus import stopwords

dataset = pd.read_csv("toronto_attractions_data.csv")
tags_col = []

# Iterate over each row in the 'Address' column
stop_words = set(stopwords.words('english'))  # Get stop words once, outside the loop
for row in dataset['Description']:
    words = [word.lower().translate(str.maketrans('', '', string.punctuation)) for word in str(row).split(" ")]  # Handle NaNs by converting row to string
    tags = ",".join([word for word in words if word not in stop_words][:20])
    tags_col.append(tags)

# Convert tags_col to a numpy array if necessary (pandas handles lists well)
# Add it as a new column to the DataFrame
dataset['Tags'] = tags_col

# Print the DataFrame with the new 'Tags' column
print(dataset.head())

# Save the modified DataFrame to a new CSV if needed
dataset.to_csv("toronto_attractions_data_with_tags.csv", index=False)