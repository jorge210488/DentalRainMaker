from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import os
import json

app = FastAPI()

# Ruta base de los archivos JSON
DATA_PATH = "data/notebooks"

# Verificar que la carpeta `data` existe
if not os.path.exists(DATA_PATH):
    raise Exception(f"La carpeta DATA_PATH no existe: {DATA_PATH}")

# Función para listar archivos JSON en la carpeta `data`
def list_json_files(directory):
    return [f for f in os.listdir(directory) if f.endswith(".json")]

# Generar endpoints dinámicamente para cada archivo JSON
def create_endpoint(file_name):
    @app.get(f"/data/{file_name.split('.')[0]}")
    async def read_json_file():
        file_path = os.path.join(DATA_PATH, file_name)

        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="Archivo no encontrado")

        try:
            with open(file_path, "r") as f:
                data = json.load(f)
            return JSONResponse(content=data)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error al leer el archivo: {str(e)}")

# Crear un endpoint para cada archivo en `data`
json_files = list_json_files(DATA_PATH)
for file in json_files:
    create_endpoint(file)

