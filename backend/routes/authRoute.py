from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from controllers.authController import register_user, login_user
from schema.userSchema import RegisterRequest, LoginRequest
from database import get_db

router = APIRouter()

@router.post("/register")
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    return register_user(payload, db)

@router.post("/login")
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    return login_user(payload, db)
