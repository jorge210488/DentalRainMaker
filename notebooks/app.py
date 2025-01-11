from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import os
import json

app = FastAPI()

# Ruta base de los archivos JSON
DATA_PATH = "data"

# Función para listar archivos JSON en la carpeta `data`
def list_json_files(directory):
    return [f for f in os.listdir(directory) if f.endswith(".json")]

# Generar endpoints dinámicamente para cada archivo JSON
json_files = list_json_files(DATA_PATH)

for file in json_files:
    endpoint_name = f"/data/{file.split('.')[0]}"  # Crear una ruta basada en el nombre del archivo sin extensión

    @app.get(endpoint_name)
    async def read_json_file(file_name=file):  # Usar un argumento por defecto para vincular el archivo
        file_path = os.path.join(DATA_PATH, file_name)

        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail="Archivo no encontrado")

        try:
            with open(file_path, "r") as f:
                data = json.load(f)
            return JSONResponse(content=data)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error al leer el archivo: {str(e)}")
