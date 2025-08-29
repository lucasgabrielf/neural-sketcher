from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import os
import base64
import uuid
from utils import FileCompressor

from Model.DigitsClassifierModel import DigitsClassifierModel

# initialize the model
model = DigitsClassifierModel()

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# pydantic models
class LinkData(BaseModel):
    href: str

@app.get("/data")
async def get_data():
    return {"message": "Backend is working fine!"}

# endpoint to post the images generated in the frontend server
@app.post("/save_image/")
async def save_image(data: LinkData):
    data_str = data.href
    try:
        header, encoded_data = data_str.split(",", 1)
        binary_data = base64.b64decode(encoded_data)
        file_extension = header.split('/')[1].split(';')[0]
        # uuid was used to generated unique identifiers to each drawing image
        unique_id = uuid.uuid4()
        sketch_name = f"sketch_{unique_id}.{file_extension}"
        sketch_path = os.path.join(os.getcwd(), f"sketches/{sketch_name}")
        with open(sketch_path, "wb") as f:
            f.write(binary_data)

        data_name = f"{unique_id}.{file_extension}"
        data_path = os.path.join(os.getcwd(), f"sketches/{data_name}")
        FileCompressor.compress_png(sketch_path, data_path)

        os.remove(sketch_path)

        predictions = model.predict(data_path)

        try:
            prediction = int(np.argmax(predictions))
        except Exception as e:
            print(f"An error occurred during {e}")
            prediction = None

        status = "Success" if prediction else "Fail"

        return {"status": status, "filename": data_name, "prediction": prediction}
    except Exception as e:
        print(f"error {e}")
