from fastapi import APIRouter, HTTPException

from app.schemas import UserRegister, UserLogin
from app.repository import (
    create_user,
    find_user,
    find_user_by_email
)
from app.auth import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter()


# -------------------------
# Register
# -------------------------
@router.post("/register")
def register(user: UserRegister):

    # Prevent admin registration
    if user.role not in ["farmer", "researcher"]:
        raise HTTPException(
            status_code=403,
            detail="Admin accounts cannot be created through registration."
        )

    # Check username
    if find_user(user.username):
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    # Check email
    if find_user_by_email(user.email):
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    user_data = {
        "username": user.username,
        "email": user.email,
        "password": hash_password(user.password),
        "role": user.role,
        "is_verified": True
    }

    create_user(user_data)

    return {
        "message": "User registered successfully"
    }
# -------------------------
# Login
# -------------------------
@router.post("/login")
def login(user: UserLogin):

    db_user = find_user(user.username)

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    if not verify_password(
        user.password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    access_token = create_access_token(
        data={
            "sub": db_user["username"],
            "role": db_user["role"]
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": db_user["role"],
        "username": db_user["username"]
    }