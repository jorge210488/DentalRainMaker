import functions_framework
import os
import json
import pandas as pd
from google.cloud import storage
import tempfile

@functions_framework.http
def process_kolla_data(request):
    """
    Procesa los archivos JSON desde el bucket almacen-data, aplica las transformaciones de pandas,
    y guarda los resultados como archivos CSV en el bucket clean-data.
    """
    # Cliente de Google Cloud Storage
    storage_client = storage.Client()
    input_bucket_name = "almacen-data"
    output_bucket_name = "clean-api-data"
    input_bucket = storage_client.bucket(input_bucket_name)
    output_bucket = storage_client.bucket(output_bucket_name)

    # Verificar si el bucket de salida existe
    if not output_bucket.exists():
        return ("El bucket de salida no existe o no es accesible.", 500)

    # Lista de archivos JSON que esperas en el bucket
    json_files = ["contacts.json", "appointments.json", "transactions.json", "treatmentPlans.json"]
    results = {}

    for json_file in json_files:
        # Descargar el archivo JSON desde el bucket
        blob = input_bucket.blob(json_file)
        json_data = json.loads(blob.download_as_text())

        # Procesar cada archivo JSON según su tipo
        if json_file == "contacts.json":
            # Desanidar la columna 'contact_info'
            df = pd.json_normalize(json_data['contacts'])
            # Eliminar la columna 'next_page_token'
            df.drop(columns=['next_page_token'], inplace=True, errors='ignore')

        elif json_file == "appointments.json":
            # Normalizar la columna 'appointments'
            df = pd.json_normalize(json_data['appointments'])
            # Eliminar la columna 'next_page_token'
            df.drop(columns=['next_page_token'], inplace=True, errors='ignore')

        elif json_file == "transactions.json":
            # Normalizar la columna 'transactions'
            df = pd.json_normalize(json_data['transactions'])
            # Eliminar la columna 'next_page_token'
            df.drop(columns=['next_page_token'], inplace=True, errors='ignore')

        elif json_file == "treatmentPlans.json":
            # Normalizar la columna 'treatmentPlans'
            df = pd.json_normalize(json_data['treatment_plans'])
            # Eliminar la columna 'next_page_token'
            df.drop(columns=['next_page_token'], inplace=True, errors='ignore')

        # Guardar el DataFrame limpio como CSV en el bucket 'clean-data'
        with tempfile.NamedTemporaryFile(mode='w', delete=False) as temp:
            df.to_csv(temp.name, index=False)
            output_blob = output_bucket.blob(f"clean_{json_file.replace('.json', '.csv')}")
            output_blob.upload_from_filename(temp.name)

        results[json_file] = f"Archivo {json_file} procesado y guardado como CSV."

    return (json.dumps(results, indent=4), 200)
