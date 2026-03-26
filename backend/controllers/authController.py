from sqlalchemy.orm import Session
from models.userModel import User
from schema.userSchema import RegisterRequest, LoginRequest

def register_user(payload: RegisterRequest, db: Session):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        return {"success": False, "message": "Email already registered"}

    user = User(name=payload.name, email=payload.email, password=payload.password)
    db.add(user)
    db.commit()
    db.refresh(user)

    return {"success": True, "message": "Registration successful", "data": {"id": str(user.id), "name": user.name, "email": user.email, "created_at": user.created_at}}

def login_user(payload: LoginRequest, db: Session):
    user = db.query(User).filter(User.email == payload.email, User.password == payload.password).first()
    if not user:
        return {"success": False, "message": "Invalid credentials"}

    return {"success": True, "message": "Login successful", "data": {"id": str(user.id), "name": user.name, "email": user.email, "created_at": user.created_at}}
