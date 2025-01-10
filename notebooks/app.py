from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import os
import json

app = FastAPI()

# Ruta base de los archivos JSON (corrección de la ruta)
DATA_PATH = "/data"

@app.get("/")
def read_root():
    return {"message": "API para disponibilizar archivos JSON generados por los gráficos."}

@app.get("/data/{filename}")
def get_json(filename: str):
    """
    Devuelve el contenido de un archivo JSON específico.
    :param filename: Nombre del archivo JSON (e.g., histogram_age_distribution.json)
    """
    # Unir la ruta base con el nombre del archivo
    file_path = os.path.join(DATA_PATH, filename)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Archivo no encontrado")

    try:
        with open(file_path, "r") as f:
            data = json.load(f)
        return JSONResponse(content=data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al leer el archivo: {str(e)}")


