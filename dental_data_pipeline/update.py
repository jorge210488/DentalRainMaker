import os
import pandas as pd
import requests
from datetime import datetime
from dotenv import load_dotenv
from git import Repo

# Cargar las variables de entorno
load_dotenv(dotenv_path='.env')

# Definir las URLs y los headers para las solicitudes
url_appointments = "https://unify.kolla.dev/dental/v1/appointments"
url_contacts = "https://unify.kolla.dev/dental/v1/contacts"

headers = {
    "accept": "application/json",
    "authorization": "Bearer kc.wy4doz22svbcdnnm4tlpkgtmkm",
    "connector-id": "opendental-50181",
    "consumer-id": "kolla-opendental-sandbox"
}

# Ruta del directorio dental_data_pipeline (suponiendo que este es el directorio base)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Directorio actual
OUTPUT_FOLDER = os.path.join(BASE_DIR, "datasets_BI")  # Aquí solo usamos "datasets_BI" para estar dentro del repositorio

# Función para obtener datos de la API y guardarlos como CSV
def fetch_data_and_save_csv(url, collection_name, output_folder):
    """
    Extrae datos de la API y los guarda como un archivo CSV.
    """
    try:
        # Realizar la solicitud GET
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Verifica si la solicitud fue exitosa
        data = response.json()

        if not data:
            print(f"La colección '{collection_name}' está vacía.")
            return

        # Convertir los datos a DataFrame
        df = pd.DataFrame(data)

        # Crear carpeta de salida si no existe
        os.makedirs(output_folder, exist_ok=True)

        # Guardar DataFrame como CSV
        output_path = os.path.join(output_folder, f"{collection_name}.csv")
        df.to_csv(output_path, index=False, encoding='utf-8')
        print(f"Archivo CSV generado: {output_path}")

    except Exception as e:
        print(f"Error al procesar la colección '{collection_name}': {e}")

# Función para hacer commit y push a GitHub
def commit_and_push_changes(repo_dir, file_path):
    try:
        # Acceder al repositorio
        repo = Repo(repo_dir)
        # Añadir el archivo modificado
        repo.git.add(file_path)
        # Commit con un mensaje
        repo.index.commit(f"Actualización de {file_path} - {datetime.now()}")
        # Hacer push a GitHub
        origin = repo.remote(name='origin')
        origin.push()
        print(f"Archivo {file_path} subido a GitHub.")
    except Exception as e:
        print(f"Error al subir el archivo a GitHub: {e}")

# Función principal para actualizar las colecciones y subir cambios a GitHub
def main():
    """
    Actualiza los archivos CSV desde las APIs y sube los cambios a GitHub.
    """
    # URLs y nombres de colecciones
    collections = [
        (url_contacts, "contacts"),
        (url_appointments, "appointments")
    ]
    
    # Obtener y guardar los datos como CSV
    for url, collection_name in collections:
        fetch_data_and_save_csv(url, collection_name, OUTPUT_FOLDER)

    # Ruta del repositorio en GitHub (relativa al entorno de GitHub Actions)
    repo_dir = os.getcwd()  # Obtiene la ruta actual del directorio de trabajo

    # Commit y push de los archivos generados
    for collection_name in ["contacts", "appointments"]:
        file_path = os.path.join(OUTPUT_FOLDER, f"{collection_name}.csv")
        commit_and_push_changes(repo_dir, file_path)

    print(f"Actualización completada el {datetime.now()}.")

if __name__ == "__main__":
    main()
