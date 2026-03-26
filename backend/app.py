from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import authRoute
from database import engine
from models import userModel

userModel.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authRoute.router, prefix="/auth")

@app.get("/")
def read_root():
    return {"Hello": "World"}
