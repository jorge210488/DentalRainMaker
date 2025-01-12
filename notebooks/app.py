from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import os
import json

app = FastAPI(title="API de Archivos JSON")

DATA_FOLDER = "data"

@app.get("/data/density_age_distribution", response_class=JSONResponse, tags=["Datos"])
async def get_density_age_distribution():
    file_path = os.path.join(DATA_FOLDER, "density_age_distribution.json")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return JSONResponse(content=data)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error al leer el archivo")
    except Exception:
        raise HTTPException(status_code=500, detail="Error al leer el archivo")

@app.get("/data/histogram_age_distribution", response_class=JSONResponse, tags=["Datos"])
async def get_histogram_age_distribution():
    file_path = os.path.join(DATA_FOLDER, "histogram_age_distribution.json")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return JSONResponse(content=data)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error al leer el archivo")
    except Exception:
        raise HTTPException(status_code=500, detail="Error al leer el archivo")

@app.get("/data/pie_chart_gender_distribution", response_class=JSONResponse, tags=["Datos"])
async def get_pie_chart_gender_distribution():
    file_path = os.path.join(DATA_FOLDER, "pie_chart_gender_distribution.json")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error al leer el archivo")
    except Exception:
        raise HTTPException(status_code=500, detail="Error al leer el archivo")

@app.get("/data/pie_chart_gender_percentage", response_class=JSONResponse, tags=["Datos"])
async def get_pie_chart_gender_percentage():
    file_path = os.path.join(DATA_FOLDER, "pie_chart_gender_percentage.json")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Archivo no encontrado")
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Error al leer el archivo")
    except Exception:
        raise HTTPException(status_code=500, detail="Error al leer el archivo")