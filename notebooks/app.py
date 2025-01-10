from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import os
import json

app = FastAPI()

# Ruta base de los archivos JSON
DATA_PATH = "data"

def get_available_files():
    """
    Función que obtiene la lista de archivos JSON en la ruta DATA_PATH.
    """
    try:
        # Obtener los archivos JSON de la carpeta
        files = [f for f in os.listdir(DATA_PATH) if f.endswith('.json')]
        return files
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al acceder a los archivos: {e}")

def read_json_file(filename: str):
    """
    Función que lee el contenido de un archivo JSON y lo devuelve.
    :param filename: Nombre del archivo JSON (e.g., pie_chart_gender_percentage.json)
    """
    try:
        file_path = os.path.join(DATA_PATH, filename)
        with open(file_path, 'r') as f:
            data = json.load(f)
        return data
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Archivo {filename} no encontrado: {e}")

# Crear un endpoint para cada archivo JSON automáticamente
files = get_available_files()
for file in files:
    # Definir el endpoint dinámicamente usando una función interna
    @app.get(f"/data/{file}")
    def get_json(filename=file):
        """
        Endpoint que devuelve el contenido de un archivo JSON específico.
        """
        data = read_json_file(filename)
        return JSONResponse(content=data)
