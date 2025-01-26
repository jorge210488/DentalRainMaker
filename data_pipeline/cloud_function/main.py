import requests
from google.cloud import storage
from dotenv import load_dotenv
import os
import json


# from google.cloud import secretmanager

# # Función para obtener un secreto desde Secret Manager
# def get_secret(secret_name):
#     client = secretmanager.SecretManagerServiceClient()
#     project_id = "dental-rain-maker-448518" 
#     secret_path = f"projects/{project_id}/secrets/{secret_name}/versions/latest"
#     response = client.access_secret_version(name=secret_path)
#     return response.payload.data.decode("UTF-8")

# # Obtener credenciales desde Secret Manager
# BEARER_TOKEN = get_secret("bearer_token")
# CONNECTOR_ID = get_secret("connector_id")
# CONSUMER_ID = get_secret("consumer_id")


def extract_kolla_data(request):
    """
    Esta función se conecta a múltiples endpoints de la API de Kolla,
    extrae los datos y los guarda en un bucket de Google Cloud Storage como archivos JSON.
    """
    # Configuración de la API de Kolla
    BASE_API_URL = "https://unify.kolla.dev/dental/v1/"
    ENDPOINTS = [
        "appointments", "claims", "communicationLogs", "contacts", 
        "documents", "insurance", "meta", "tasks", 
        "transactions", "treatmentPlans"
    ]
    
    load_dotenv()  # Carga las variables de entorno desde el archivo .env

    BEARER_TOKEN = os.getenv("BEARER_TOKEN")
    CONNECTOR_ID = os.getenv("CONNECTOR_ID")
    CONSUMER_ID = os.getenv("CONSUMER_ID")

    # Nombre del bucket de Google Cloud Storage
    BUCKET_NAME = "almacen-data"  # Cambiar por el nombre de tu bucket
    
    # Cabeceras para la autenticación
    headers = {
        "Authorization": f"Bearer {BEARER_TOKEN}",
        "Connector-ID": CONNECTOR_ID,
        "Consumer-ID": CONSUMER_ID
    }
    
    # Cliente de Google Cloud Storage
    storage_client = storage.Client()
    bucket = storage_client.bucket(BUCKET_NAME)
    
    results = {}
    
    try:
        for endpoint in ENDPOINTS:
            api_url = f"{BASE_API_URL}{endpoint}"
            response = requests.get(api_url, headers=headers)
            response.raise_for_status()  # Lanza excepción en caso de error HTTP
            
            data = response.json()  # Extraer los datos en formato JSON
            
            # Subir datos al bucket como archivo JSON
            blob = bucket.blob(f"{endpoint}.json")
            blob.upload_from_string(
                json.dumps(data, indent=4),  # Formatear como JSON
                content_type="application/json"
            )
            
            # Guardar el estado de cada endpoint
            results[endpoint] = "Datos almacenados correctamente"
    
        return json.dumps(results, indent=4), 200

    except requests.exceptions.RequestException as e:
        return f"Error al conectarse a la API: {str(e)}", 500

    except Exception as e:
        return f"Error general: {str(e)}", 500
