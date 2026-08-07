from pydantic import BaseModel, EmailStr
from typing import Literal


class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    role: Literal["farmer", "researcher"]


class UserLogin(BaseModel):
    username: str
    password: str