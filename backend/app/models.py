from pydantic import BaseModel, EmailStr
from typing import Literal


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: Literal["admin", "farmer"]


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    username: str
    email: EmailStr
    role: str


class Token(BaseModel):
    access_token: str
    token_type: str