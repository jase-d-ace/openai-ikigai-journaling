from pydantic import BaseModel
from typing import List
import uuid

class User(BaseModel): 
    id: uuid.UUID
    username: str
    hashed_password: str
    journals: List["Journal"] = []

    class Config:
        orm_mode = True