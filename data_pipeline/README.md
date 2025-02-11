
# Data Pipeline in Google Cloud Platform (GCP)

This project implements a data pipeline in GCP for Extract, Transform, and Load (ETL) processes, extracting data from an external API and storing and analyzing it in BigQuery.

Pipeline Architecture

The pipeline follows these steps:

Data Extraction: Data is retrieved from a REST API.

Processing with Cloud Functions: Two Cloud Functions handle data extraction and transformation.

Storage in Cloud Storage: JSON data is stored in the almacen-data bucket.

Transformation with Python and Pandas: JSON files are processed to clean and structure the data before loading it into BigQuery.

Storage of Transformed Data: Transformed CSV files are stored in the clean-api-data bucket.

Loading into BigQuery: Transformed data is stored in BigQuery tables, ensuring daily updates.

Visualization with Looker: A Looker dashboard is created for data analysis.

Technical Details

1. Data Extraction

Data is obtained from an external REST API.

2. Processing with Cloud Functions

Two Cloud Functions are implemented:

Extraction Function: Retrieves data from the API and stores it in almacen-data.

Transformation Function: Processes JSON data, removes unnecessary columns, converts it to CSV, and stores it in clean-api-data.

3. Storage in Cloud Storage

almacen-data bucket: Contains raw JSON files.

clean-api-data bucket: Contains CSV files ready for loading into BigQuery.

4. Data Transformation

Before loading into BigQuery, the following transformations are applied:

Denormalization: The main information column in each endpoint is denormalized to normalize the structure.

Unnecessary Column Removal: The next_page_token column is removed from all files.

Format Conversion: JSON files are converted to CSV and stored in the clean-api-data bucket.

5. Loading into BigQuery

CSV files stored in clean-api-data are loaded into predefined BigQuery tables. Automatic updates ensure data reflects the latest information.

6. Data Visualization

Looker: Used to generate interactive dashboards based on data loaded in BigQuery.

![Analytical dashboard for the app administrator view](images/desktop.png)

Technologies Used

Google Cloud Platform (GCP): Cloud Functions, Cloud Storage, BigQuery

Python: Requests, Pandas

Looker: Data visualization

Deployment and Automation

The extraction and loading process runs through automated Cloud Functions, ensuring continuous data updates in BigQuery.