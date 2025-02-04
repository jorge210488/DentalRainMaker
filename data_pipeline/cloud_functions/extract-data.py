import functions_framework
import requests
import os
import json
from google.cloud import storage

@functions_framework.http
def extract_kolla_data(request):
    """
    Extrae datos de Kolla y los guarda como archivos JSON en un bucket de Google Cloud Storage.
    """
    BASE_API_URL = "https://unify.kolla.dev/dental/v1/"
    ENDPOINTS = [
        "appointments", "contacts",  
        "transactions", "treatmentPlans"
    ]

    # Credenciales de la API de Kolla definidas como variables de entorno
    BEARER_TOKEN = os.getenv("BEARER_TOKEN")
    CONNECTOR_ID = os.getenv("CONNECTOR_ID")
    CONSUMER_ID = os.getenv("CONSUMER_ID")
    BUCKET_NAME = os.getenv("BUCKET_NAME", "almacen-data")

    # Validar credenciales
    if not all([BEARER_TOKEN, CONNECTOR_ID, CONSUMER_ID]):
        return ("Faltan credenciales o configuración en las variables de entorno", 400)

    headers = {
        "Authorization": f"Bearer {BEARER_TOKEN}",
        "Connector-ID": CONNECTOR_ID,
        "Consumer-ID": CONSUMER_ID
    }

    # Cliente de Google Cloud Storage
    storage_client = storage.Client()
    bucket = storage_client.bucket(BUCKET_NAME)

    # Verificar si el bucket existe
    if not bucket.exists():
        return (f"El bucket {BUCKET_NAME} no existe o no es accesible.", 500)

    results = {}

    try:
        for endpoint in ENDPOINTS:
            api_url = f"{BASE_API_URL}{endpoint}"
            response = requests.get(api_url, headers=headers)

            # Verificar el estado de la respuesta
            if not response.ok:
                results[endpoint] = f"Error al obtener datos de {endpoint}. Código de estado: {response.status_code}"
                continue
            
            data = response.json()
            
            # Guardar los datos en formato JSON en el bucket
            blob = bucket.blob(f"{endpoint}.json")
            blob.upload_from_string(
                json.dumps(data, indent=4),
                content_type="application/json"
            )
            results[endpoint] = "Datos obtenidos y almacenados correctamente"
        
        return (json.dumps(results, indent=4), 200)

    except requests.exceptions.RequestException as e:
        return (f"Error al conectarse a la API: {str(e)}", 500)

    except Exception as e:
        return (f"Error general: {str(e)}", 500)
