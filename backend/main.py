from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import shutil

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

@app.get("/data")
async def get_data():
    return {"message": "Backend is working fine!"}

# endpoint to post the images generated in the frontend server
@app.post("/save_image/")
async def save_image(file: UploadFile = File(...)):
    print(f"Filename: {file.filename}")
    print(f"Content type: {file.content_type}")

    with open(f"sketches/{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"filename": file.filename, "message": "File uploaded successfully"}

