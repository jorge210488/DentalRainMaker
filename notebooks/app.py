from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import os
import json

app = FastAPI(title="API de Archivos JSON")

DATA_FOLDER = "notebooks/data"

# Archivos JSON específicos
JSON_FILES = {
    "density_age_distribution": "density_age_distribution.json",
    "histogram_age_distribution": "histogram_age_distribution.json",
    "pie_chart_gender_distribution": "pie_chart_gender_distribution.json",
    "pie_chart_gender_percentage": "pie_chart_gender_percentage.json",
}

# Crear endpoints
for endpoint_name, file_name in JSON_FILES.items():
    file_path = os.path.join(DATA_FOLDER, file_name)

    @app.get(f"/data/{endpoint_name}", response_class=JSONResponse, tags=["Datos"])
    async def _read_json_file(file_path=file_path):
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