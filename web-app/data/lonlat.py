import pandas as pd
import json

# Load the dataset
dataset = pd.read_csv("toronto_attractions_data_with_tags.csv")

# Initialize lists to hold longitude and latitude
long = []
lat = []

# Extract longitude and latitude from the 'geometry' column
for row in dataset['geometry']:
    coord = json.loads(row)  # Ensure 'geometry' is properly parsed as JSON
    long.append(coord['coordinates'][0][0])  # Longitude
    lat.append(coord['coordinates'][0][1])  # Latitude

# Add the longitude and latitude columns to the DataFrame
dataset['longitude'] = long
dataset['latitude'] = lat

# Drop the 'geometry' and 'Neighbourhood' columns (add inplace=True to modify the DataFrame)
dataset.drop(["Neighbourhood","Neighbourhood_Num","Ward","Ward_Name","Order","geometry"], axis=1, inplace=True)

# Print the updated DataFrame
print(dataset.head())

# Save the updated DataFrame to a new CSV file
dataset.to_csv("toronto_attractions_data_with_tags2.csv", index=False)